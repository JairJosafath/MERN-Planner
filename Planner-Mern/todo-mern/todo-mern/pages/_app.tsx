import type { AppProps } from "next/app";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Breadcrumb from "../components/Breadcrumb";
import Titlebar from "../components/Titlebar";
import styles from "../styles/layout.module.scss";
import "../styles/styles.css";
export const Darkmode = createContext<
  | { darkmode: boolean; setDarkmode: Dispatch<SetStateAction<boolean>> }
  | undefined
>(undefined);
export default function App({ Component, pageProps }: AppProps) {
  const [darkmode, setDarkmode] = useState(false);

  return (
    <>
      <div className={darkmode ? styles.dark : styles.light}>
        <Darkmode.Provider value={{ darkmode, setDarkmode }}>
          <Titlebar darkmode={darkmode} setDarkmode={setDarkmode} />

          <main>
            <Breadcrumb />
            <Component {...pageProps} />
          </main>
        </Darkmode.Provider>
      </div>
    </>
  );
}
