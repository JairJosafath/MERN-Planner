import { Todo as TodoI } from "../../types/types";
import styles from "../../styles/components/projects/projects.module.scss";
import {
  AiFillCheckSquare,
  AiFillDelete,
  AiFillExclamationCircle,
  AiOutlineExclamation,
  AiOutlineMore,
} from "react-icons/ai";
import {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Ctx } from "../Layout";
import { formatDate } from "../../util";
import { NextRouter, useRouter } from "next/router";
interface Props {
  todo?: TodoI;
  setReload?: Dispatch<SetStateAction<boolean>>;
}
export default function Todo({ todo, setReload }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const context = useContext(Ctx);
  const [showmenu, setShowMenu] = useState<string | undefined>("");
  const [showPriorityMenu, setShowPriorityMenu] = useState<string | undefined>(
    ""
  );
  const [showColorMenu, setShowColorMenu] = useState<string | undefined>("");
  const [color, setColor] = useState("");
  const [title, setName] = useState(todo?.title);
  const [description, setDescription] = useState(todo?.description);
  const [startDate, setStartDate] = useState(
    formatDate(todo?.startDate ? todo?.startDate : "")
  );
  const [dueDate, setDueDate] = useState(
    formatDate(todo?.dueDate ? todo?.dueDate : "")
  );
  const [newTodo, setNewTodo] = useState<TodoI>();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (
      (title ? title?.length > 3 : false) &&
      title !== todo?.title &&
      todo?._id
    )
      timeout = setTimeout(() => {
        updateTodo(todo?._id, { title: title });
        setReload ? setReload(true) : console.log("gmhh no reload");
      }, 1000);
    return () => clearTimeout(timeout);
  }, [setReload, title, todo?._id, todo?.title]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (
      (description ? description?.length > 3 : false) &&
      description !== todo?.description &&
      todo?._id
    )
      timeout = setTimeout(() => {
        updateTodo(todo?._id, { description: description });
        setReload ? setReload(true) : console.log("gmhh no reload");
      }, 1000);
    return () => clearTimeout(timeout);
  }, [description, setReload, todo?._id, todo?.description]);

  useEffect(() => {
    if (
      formatDate(todo?.startDate ? todo?.startDate : "") !== startDate &&
      todo?._id
    )
      updateTodo(todo?._id, { startDate: startDate });
    setReload ? setReload(true) : console.log("gmhh no reload");
  }, [setReload, startDate, todo?._id, todo?.startDate]);
  useEffect(() => {
    if (formatDate(todo?.dueDate ? todo?.dueDate : "") !== dueDate && todo?._id)
      updateTodo(todo?._id, { dueDate: dueDate });
    setReload ? setReload(true) : console.log("gmhh no reload");
  }, [dueDate, setReload, todo?._id, todo?.dueDate]);
  useEffect(() => {
    if (!todo?._id) {
      setNewTodo({
        title: title,
        description: description,
        startDate: startDate,
        dueDate: dueDate,
        color: color,
      });
    }
  }, [color, description, dueDate, title, todo?._id, startDate, id]);

  return (
    <div
      key={todo?._id}
      className={
        context?.darkMode ? styles["project-dark"] : styles["project-light"]
      }
      onClick={() => {
        showmenu ? setShowMenu("") : null;
        showPriorityMenu ? setShowPriorityMenu("") : null;
        // todo?._id ? router.push(`/todo/${todo?._id}`) : null;
      }}
    >
      <div className={styles["flex-header"]}>
        <input
          type={"text"}
          value={title}
          placeholder="todo title"
          onChange={(e) => {
            e.stopPropagation();
            setName(e.target.value);
          }}
        />
        <div>
          {todo ? (
            <>
              <div
                className={styles["color-circle"]}
                onClick={(e) => {
                  e.stopPropagation();
                  showColorMenu === todo?._id
                    ? setShowColorMenu("")
                    : setShowColorMenu(todo?._id);
                }}
                style={{ background: todo?.color ? todo?.color : "grey" }}
              />
              <AiFillExclamationCircle
                color={
                  todo?.priority === 1
                    ? "red"
                    : todo?.priority === 2
                    ? "orange"
                    : "blue"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriorityMenu(todo?._id);
                }}
              />
              <AiFillCheckSquare
                color={todo?.status === "in progress" ? "grey" : "green"}
                onClick={(e) => {
                  e.stopPropagation();
                  updateTodo(
                    todo?._id,
                    todo?.status === "in progress"
                      ? { status: "completed" }
                      : { status: "in progress" }
                  );
                  setReload ? setReload(true) : console.log("gmhh no reload");
                }}
              />
              <AiOutlineMore
                onClick={(e) => {
                  e.stopPropagation();
                  showmenu ? setShowMenu("") : setShowMenu(todo?._id);
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      {showmenu === todo?._id ? (
        <menu className={styles.menu} onClick={() => setShowMenu("")}>
          <ul>
            {/* <li>archive todo</li> */}
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(todo?._id);
                setReload ? setReload(true) : console.log("gmhh no reload");
                setShowMenu("");
              }}
            >
              delete todo
            </li>
          </ul>
        </menu>
      ) : null}
      <div>
        {showmenu === todo?._id ? (
          <menu className={styles.menu} onClick={() => setShowMenu("")}>
            <ul>
              {/* <li>archive todo</li> */}
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(todo?._id);
                  setReload ? setReload(true) : console.log("gmhh no reload");
                }}
              >
                delete todo
              </li>
            </ul>
          </menu>
        ) : null}
        {showColorMenu === todo?._id ? (
          <menu className={styles.menu}>
            <ul>
              {["red", "green", "blue", "yellow"].map((c, index) => (
                <div
                  key={c}
                  className={styles["color-circle"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTodo(todo?._id, { color: c });
                    setReload ? setReload(true) : console.log("gmhh no reload");

                    setShowColorMenu("");
                  }}
                  style={{ background: c }}
                ></div>
              ))}
              <div>
                <div>
                  <input
                    type={"text"}
                    value={color}
                    placeholder={"color code"}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <button
                  onClick={(e) => {
                    if (color) {
                      e.stopPropagation();
                      updateTodo(todo?._id, { color: color });
                      setReload
                        ? setReload(true)
                        : console.log("gmhh no reload");
                      setColor("");
                    }
                    setShowColorMenu("");
                  }}
                >
                  Set
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowColorMenu("");
                  }}
                >
                  cancel
                </button>
              </div>
            </ul>
          </menu>
        ) : null}
        {showPriorityMenu === todo?._id ? (
          <menu
            className={styles.menu}
            onClick={(e) => {
              e.stopPropagation();
              setShowPriorityMenu("");
            }}
          >
            <ul>
              {["high", "medium", "low"].map((p, index) => (
                <li
                  key={p}
                  onClick={(e) => {
                    updateTodo(todo?._id, { priority: index + 1 });
                    setReload ? setReload(true) : console.log("gmhh no reload");
                    setShowPriorityMenu("");
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          </menu>
        ) : null}
        <textarea
          value={description}
          placeholder={"description"}
          onChange={(e) => {
            e.stopPropagation();
            setDescription(e.target.value);
          }}
        />
        <div className={styles.flex}>
          <div>
            <label>Start</label>
            <input
              type={"date"}
              value={startDate}
              onChange={(e) => {
                e.stopPropagation();
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Due</label>
            <input
              type={"date"}
              value={dueDate}
              onChange={(e) => {
                e.stopPropagation();
                setDueDate(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {todo === undefined ? (
        <button
          onClick={(e) => {
            handleAddTodo(id ? id?.toString() : "", newTodo);
            setReload ? setReload(true) : console.log("gmhh no reload");
            setName("");
            setDescription("");
            setStartDate("");
            setDueDate("");
            setColor("");
          }}
        >
          add todo
        </button>
      ) : null}
    </div>
  );
}

function handleDeleteTodo(id: string | undefined) {
  async function fn() {
    const res = await fetch(`/api/deletetodo/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    console.log(await res.json());
  }
  if (id) fn();
}
function updateTodo(id: string | undefined, updated: TodoI | undefined) {
  console.log("idated", updated);
  async function fn() {
    const res = await fetch(`/api/updatetodo/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(updated),
    });

    console.log(await res.json());
  }
  if (id) fn();
}
function handleAddTodo(taskId: string, newTodo: TodoI | undefined) {
  console.log("idated", newTodo);
  const body = { ...newTodo, task: { id: taskId } };
  async function fn() {
    const res = await fetch(`/api/addtodo`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log(await res.json());
  }
  if (newTodo?.title) fn();
}
