import styles from "../Card/card.styles.module.scss";
import { useContext } from "react";
import { Darkmode } from "../../pages/_app";
interface Props {
  children: React.ReactNode;
}

export default function Header({ children }: Props) {
  const ctx = useContext(Darkmode);
  return (
    <div
      className={ctx?.darkmode ? styles["header-dark"] : styles["header-light"]}
    >
      {children}
    </div>
  );
}
