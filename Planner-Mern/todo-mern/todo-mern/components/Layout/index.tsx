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
import Footer from "../Footer";
import Navbar from "../Navbar";
import styles from "../../styles/layout.module.scss";

import Sidenav from "../Sidenav";

interface props {
  children: ReactNode;
}
export const Ctx = createContext<
  | { darkMode: boolean; setDarkMode: Dispatch<SetStateAction<boolean>> }
  | undefined
>(undefined);

export default function Layout({ children }: props) {
  const [darkMode, setDarkMode] = useState(false);
  const [showSideNav, setShowSideNav] = useState<boolean>(false);

  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <Ctx.Provider value={{ darkMode, setDarkMode }}>
        <Navbar showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
        <div className={styles["main-content"]}>
          <Sidenav showSideNav={showSideNav} />
          <main className={!showSideNav ? styles["main-full"] : ""}>
            {children}
          </main>
        </div>
      </Ctx.Provider>
    </div>
  );
}
