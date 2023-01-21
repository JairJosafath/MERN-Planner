import { Darkmode } from "../../pages/_app";
import Header from "../Card.Header";
import styles from "./card.styles.module.scss";
import { useContext } from "react";
interface Props {
  children: React.ReactNode;
}
export default function Card({ children }: Props) {
  const ctx = useContext(Darkmode);
  return (
    <div className={styles.wrapper}>
      <div
        className={ctx?.darkmode ? styles["card-dark"] : styles["card-light"]}
      >
        {children}
      </div>
    </div>
  );
}
