import styles from "./menu.styles.module.scss";
import { useRef, useState, useEffect, RefObject, MouseEvent } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  variant?: "primary" | "outline";
  // size?: "xs" | "sm" | "md" | "lg" | "xl";
  items: { label: string; onClick: () => void }[];
  /**
   * allows user to control collapse state from outside clicks
   */
  show?: boolean | undefined;
}

export default function Menu({
  items,
  variant = "primary",
  show = true,
  ...props
}: Props) {
  const className = `${styles["menu-content"]} ${styles["menu-" + variant]} ${
    show ? styles["menu-expanded"] : ""
  } ${!show ? styles["menu-collapsed"] : ""}`;

  return (
    <div className={styles.wrapper}>
      <div className={className}>
        <ul>
          {items.map(({ label, onClick }, index) => (
            <li
              key={index}
              onClick={() => {
                onClick();
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
