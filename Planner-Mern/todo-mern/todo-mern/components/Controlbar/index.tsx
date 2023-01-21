import { Dispatch, SetStateAction, useContext } from "react";
import {
  AiFillPlusSquare,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { ModalCTX, ModalInterface } from "../../pages/_app";
import Input from "../Input";
import Modal from "../Modal";
import Project from "../Project";
import styles from "./styles.module.scss";

interface Props {
  action: string;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export default function Controlbar({ action, setReload }: Props) {
  const ctx = useContext(ModalCTX);
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["controlbar-content"]}>
        {/* <div>
          <Input placeholder="type to search" />
          <AiOutlineSearch />
        </div> */}
        <div>
          <AiOutlinePlus
            onClick={() =>
              ctx?.setModal({
                title: "add Project",
                visible: true,
                children: <Project setReload={setReload} />,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
