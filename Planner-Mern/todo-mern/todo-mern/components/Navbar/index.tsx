import { FaUserAlt, FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Ctx } from "../Layout";
import styles from "../../styles/components/navbar/navbar.module.scss";

interface Props {
  showSideNav: boolean;
  setShowSideNav: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ showSideNav, setShowSideNav }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const context = useContext(Ctx);

  return (
    <>
      <div
        className={context?.darkMode ? styles["nav-dark"] : styles["nav-light"]}
      >
        <div>
          {showSideNav ? (
            <AiOutlineClose onClick={() => setShowSideNav(false)} />
          ) : (
            <AiOutlineMenu onClick={() => setShowSideNav(true)} />
          )}
        </div>
        <p>ProPlanner </p>
        <div onClick={() => context?.setDarkMode(!context?.darkMode)}>
          {context?.darkMode ? <FaSun /> : <FaMoon />}
        </div>

        <div onClick={() => setShowMenu(!showMenu)}>
          <FaUserAlt />
        </div>
        {/* menu */}
        <ul className={!showMenu ? styles["hidden"] : styles["list"]}>
          <li onClick={() => setShowMenu(false)}>Manage Account</li>
          <li onClick={() => setShowMenu(false)}>Log Out</li>
        </ul>
      </div>
    </>
  );
}
//  className={showMenu ? styles.menu : styles["hidden-menu"]} className={styles.titlebar}
