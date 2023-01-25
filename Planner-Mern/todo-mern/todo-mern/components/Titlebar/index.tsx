import styles from "./styles.module.scss";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
interface Props {
  setDarkmode: Dispatch<SetStateAction<boolean>>;
  darkmode: boolean;
}
export default function Titlebar({ setDarkmode, darkmode }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles["titlebar-dark"]}>
        <p>{`NEXT PLANNER`}</p>
        {darkmode ? (
          <MdDarkMode onClick={() => setDarkmode(!darkmode)} />
        ) : (
          <MdLightMode onClick={() => setDarkmode(!darkmode)} />
        )}
      </div>
    </div>
  );
}
