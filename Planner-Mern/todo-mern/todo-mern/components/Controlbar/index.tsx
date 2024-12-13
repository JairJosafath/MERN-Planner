import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AiFillAppstore,
  AiFillCalendar,
  AiFillPlusSquare,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { ModalCTX, ModalInterface } from "../../pages/_app";
import Input from "../Input";
import Modal from "../Modal";
import Project from "../Project";
import Task from "../Task";
import Todo from "../Todo";
import styles from "./styles.module.scss";

interface Props {
  action: string;
  setReload: Dispatch<SetStateAction<boolean>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  setReq?: Dispatch<
    SetStateAction<
      | {
          url: string;
          headers?: HeadersInit | undefined;
          body?: object | undefined;
          method?: string | undefined;
        }
      | undefined
    >
  >;
}

export default function Controlbar({
  action,
  setReload,
  setMode,
  mode,
}: // setReq,
Props) {
  const [search, setSearch] = useState("");
  const ctx = useContext(ModalCTX);

  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     if (search.length >= 3 && setReq && action === "addproject") {
  //       setReq({
  //         url: `api/search${action.replace("add", "")}?value=${encodeURI(
  //           search
  //         )}`,
  //       });
  //     } else if (search.length === 0) setReload(true);
  //   }, 1000);
  //   return () => clearTimeout(t);
  // }, []);
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["controlbar-content"]}>
        {false && (
          <div>
            <Input
              placeholder="type to search"
              inputSize="lg"
              value={search}
              onChange={(e) =>
                action === "addproject" ? setSearch(e.target.value) : null
              }
            />
            <AiOutlineSearch />
          </div>
        )}
        <div>
          <AiFillAppstore
            onClick={() => setMode("card")}
            className={mode === "card" ? styles["active"] : ""}
          />
          <AiFillCalendar
            onClick={() => setMode("calendar")}
            className={mode === "calendar" ? styles["active"] : ""}
          />
        </div>
        <div>
          <AiOutlinePlus
            onClick={() => {
              switch (action) {
                case "addproject":
                  ctx?.setModal({
                    title: "add Project",
                    visible: true,
                    children: <Project setReload={setReload} />,
                  });
                  break;

                case "addtask":
                  ctx?.setModal({
                    title: "add Task",
                    visible: true,
                    children: <Task setReload={setReload} />,
                  });
                  break;
                case "addtodo":
                  ctx?.setModal({
                    title: "add Todo",
                    visible: true,
                    children: <Todo setReload={setReload} />,
                  });
                  break;

                default:
                  break;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
