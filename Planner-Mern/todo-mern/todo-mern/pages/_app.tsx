import type { AppProps } from "next/app";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";
import Titlebar from "../components/Titlebar";
import styles from "../styles/layout.module.scss";
import "../styles/styles.css";

export interface ModalInterface {
  visible: boolean;
  action?: () => void;
  title: string;
  children: React.ReactNode;
}
export const Darkmode = createContext<
  | { darkmode: boolean; setDarkmode: Dispatch<SetStateAction<boolean>> }
  | undefined
>(undefined);
export const ModalCTX = createContext<
  | {
      setModal: Dispatch<SetStateAction<ModalInterface>>;
      modal: ModalInterface;
    }
  | undefined
>(undefined);

export default function App({ Component, pageProps }: AppProps) {
  const [darkmode, setDarkmode] = useState(false);
  const [modal, setModal] = useState<ModalInterface>({
    visible: false,

    title: "",
    children: null,
  });
  return (
    <>
      <div className={darkmode ? styles.dark : styles.light}>
        <Darkmode.Provider value={{ darkmode, setDarkmode }}>
          <Titlebar darkmode={darkmode} setDarkmode={setDarkmode} />
          <ModalCTX.Provider value={{ modal, setModal }}>
            <main>
              <Breadcrumb />
              <Component {...pageProps} />
              <Modal modal={modal} setModal={setModal} />
            </main>
          </ModalCTX.Provider>
        </Darkmode.Provider>
      </div>
    </>
  );
}
