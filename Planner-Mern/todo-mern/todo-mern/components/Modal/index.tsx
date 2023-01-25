import { Dispatch, SetStateAction, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Darkmode, ModalInterface } from "../../pages/_app";
import Button from "../Button";
import styles from "./styles.module.scss";

interface Props {
  modal: ModalInterface;
  setModal: Dispatch<SetStateAction<ModalInterface>>;
}
export default function Modal({ modal, setModal }: Props) {
  const ctx = useContext(Darkmode);

  return modal?.visible ? (
    <div
      className={styles.wrapper}
      onClick={() => setModal({ ...modal, visible: false })}
    >
      <div
        className={`${styles["modal-content"]} ${
          ctx?.darkmode ? styles["modal-dark"] : styles["modal-light"]
        }`}
      >
        <div
          className={styles["modal-title"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p>{modal.title}</p>
          <AiOutlineClose
            onClick={(e) => {
              setModal({ ...modal, visible: false });
            }}
          />
        </div>
        <div
          className={styles["modal-main"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {modal.children}
        </div>
        <div
          className={styles["modal-footer"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button onClick={modal.action}>{modal.title}</Button>
          <Button
            variant={"text"}
            onClick={(e) => {
              setModal({ ...modal, visible: false });
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}
