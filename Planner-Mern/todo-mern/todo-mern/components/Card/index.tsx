import { Darkmode } from "../../pages/_app";
import Header from "../Card.Header";
import styles from "./card.styles.module.scss";
import { useContext } from "react";
interface Props {
  children: React.ReactNode;
  shadow: boolean;
}
export default function Card({ children, shadow = true }: Props) {
  const ctx = useContext(Darkmode);
  return (
    <div className={`${styles.wrapper}`}>
      <div
        className={`${
          ctx?.darkmode ? styles["card-dark"] : styles["card-light"]
        } ${!shadow ? styles["noshadow"] : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
