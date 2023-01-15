import styles from "../../styles/components/sidenav/sidenav.module.scss";
import {
  createContext,
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  LegacyRef,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  AiFillCodepenCircle,
  AiFillEdit,
  AiFillPlusCircle,
  AiFillPlusSquare,
  AiOutlineFileSearch,
  AiOutlinePoundCircle,
  AiOutlineSearch,
  AiTwotoneEdit,
} from "react-icons/ai";
import { FaPencilAlt, FaPlug, FaPlus } from "react-icons/fa";
import Explorer from "../Explorer";

const list = [
  { label: "search", element: <AiOutlineSearch /> },
  { label: "add", element: <AiFillPlusCircle /> },
  // { label: "edit", element: <AiTwotoneEdit /> },
  // { label: "explorer", element: <Explorer /> },
];

const tiltEffectSettings = {
  max: 2, // max tilt rotation (degrees (deg))
  perspective: 100, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
  scale: 1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  easing: "cubic-bezier(.03,.98,.52,.99)", // easing (transition-timing-function) of the enter/exit transition
};

interface Props {
  showSideNav: boolean;
}

export default function Sidenav({ showSideNav }: Props) {
  const itemIcon = useRef<null | HTMLDivElement>(null);
  console.log("render");
  function mouseMove(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const card = e.currentTarget;
    const cardWidth = card?.offsetWidth;
    const cardHeight = card?.offsetHeight;
    const centerX = card?.offsetLeft + cardWidth / 2;
    const centerY = card?.offsetTop + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateXUncapped =
      (tiltEffectSettings.max * mouseY) / (cardHeight / 2);
    const rotateYUncapped = (tiltEffectSettings.max * mouseX) / (cardWidth / 2);
    const rotateX =
      rotateXUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateXUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateXUncapped;
    const rotateY =
      rotateYUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateYUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateYUncapped;

    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  }
  function mouseLeave(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    // if (itemIcon.current) itemIcon.current.style.transform = "none";
    setTransition(e);
  }
  function mouseEnter(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    setTransition(e);
  }
  function setTransition(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const card = e.currentTarget;
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
  }

  const classNamesMenu = showSideNav
    ? styles["sidenav-light"]
    : styles["sidenav-hidden"];
  const classNamesControl = showSideNav
    ? styles["controls-light"]
    : styles["hidden"];
  return (
    <>
      {/* sidenav */}
      <div className={classNamesMenu}>
        <div
          className={classNamesControl}
          onMouseEnter={(e) => mouseEnter(e)}
          onMouseMove={(e) => mouseMove(e)}
          onMouseLeave={(e) => mouseLeave(e)}
        >
          {list.map((item) => (
            <div key={item.label}>{item.element}</div>
          ))}
        </div>

        <Explorer />
      </div>
    </>
  );
}
