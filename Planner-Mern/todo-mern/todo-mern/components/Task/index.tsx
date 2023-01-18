import { Task as TaskI } from "../../types/types";
import styles from "../../styles/components/projects/projects.module.scss";
import {
  AiFillCheckSquare,
  AiFillDelete,
  AiFillExclamationCircle,
  AiOutlineExclamation,
  AiOutlineMore,
} from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { Ctx } from "../Layout";
import { formatDate } from "../../util";
import { useRouter } from "next/router";
interface Props {
  task?: TaskI;
}
export default function Task({ task }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const context = useContext(Ctx);
  const [showmenu, setShowMenu] = useState<string | undefined>("");
  const [showPriorityMenu, setShowPriorityMenu] = useState<string | undefined>(
    ""
  );
  const [showColorMenu, setShowColorMenu] = useState<string | undefined>("");
  const [color, setColor] = useState("");
  const [name, setName] = useState(task?.name);
  const [description, setDescription] = useState(task?.description);
  const [startDate, setStartDate] = useState(
    formatDate(task?.startDate ? task?.startDate : "")
  );
  const [dueDate, setDueDate] = useState(
    formatDate(task?.dueDate ? task?.dueDate : "")
  );
  const [newTask, setNewTask] = useState<TaskI>();
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if ((name ? name?.length > 3 : false) && name !== task?.name && task?._id)
      timeout = setTimeout(() => {
        updateTask(task?._id, { name: name });
      }, 1000);
    return () => clearTimeout(timeout);
  }, [name, task?._id, task?.name]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (
      (description ? description?.length > 3 : false) &&
      description !== task?.description &&
      task?._id
    )
      timeout = setTimeout(() => {
        updateTask(task?._id, { description: description });
      }, 1000);
    return () => clearTimeout(timeout);
  }, [description, task?._id, task?.description]);

  useEffect(() => {
    if (
      formatDate(task?.startDate ? task?.startDate : "") !== startDate &&
      task?._id
    )
      updateTask(task?._id, { startDate: startDate });
  }, [startDate, task?._id, task?.startDate]);
  useEffect(() => {
    if (formatDate(task?.dueDate ? task?.dueDate : "") !== dueDate && task?._id)
      updateTask(task?._id, { dueDate: dueDate });
  }, [dueDate, task?._id, task?.dueDate]);
  useEffect(() => {
    if (!task?._id) {
      setNewTask({
        name: name,
        description: description,
        startDate: startDate,
        dueDate: dueDate,
        color: color,
      });
    }
  }, [color, description, dueDate, name, task?._id, startDate, id]);

  return (
    <div
      key={task?._id}
      className={
        context?.darkMode ? styles["project-dark"] : styles["project-light"]
      }
      onClick={() => {
        showmenu ? setShowMenu("") : null;
        showPriorityMenu ? setShowPriorityMenu("") : null;
        task?._id ? router.push(`/task/${task?._id}`) : null;
      }}
    >
      <div className={styles["flex-header"]}>
        <input
          type={"text"}
          value={name}
          placeholder="task name"
          onChange={(e) => {
            e.stopPropagation();
            setName(e.target.value);
          }}
        />
        <div>
          <div
            className={styles["color-circle"]}
            onClick={(e) => {
              e.stopPropagation();
              showColorMenu === task?._id
                ? setShowColorMenu("")
                : setShowColorMenu(task?._id);
            }}
            style={{ background: task?.color ? task?.color : "grey" }}
          />
          {task ? (
            <>
              <AiFillExclamationCircle
                color={
                  task?.priority === 1
                    ? "red"
                    : task?.priority === 2
                    ? "orange"
                    : "blue"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriorityMenu(task?._id);
                }}
              />
              <AiFillCheckSquare
                color={task?.status === "in progress" ? "grey" : "green"}
                onClick={(e) => {
                  e.stopPropagation();
                  updateTask(
                    task?._id,
                    task?.status === "in progress"
                      ? { status: "completed" }
                      : { status: "in progress" }
                  );
                }}
              />
              <AiOutlineMore
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(task?._id);
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      {showmenu === task?._id ? (
        <menu className={styles.menu} onClick={() => setShowMenu("")}>
          <ul>
            <li>archive task</li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task?._id);
              }}
            >
              delete task
            </li>
          </ul>
        </menu>
      ) : null}
      <div>
        {showmenu === task?._id ? (
          <menu className={styles.menu} onClick={() => setShowMenu("")}>
            <ul>
              <li>archive task</li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task?._id);
                }}
              >
                delete task
              </li>
            </ul>
          </menu>
        ) : null}
        {showColorMenu === task?._id ? (
          <menu className={styles.menu}>
            <ul>
              {["red", "green", "blue", "yellow"].map((c, index) => (
                <div
                  key={c}
                  className={styles["color-circle"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTask(task?._id, { color: c });
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
                      updateTask(task?._id, { color: color });
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
        {showPriorityMenu === task?._id ? (
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
                    e.stopPropagation();
                    updateTask(task?._id, { priority: index + 1 });
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
      {task === undefined ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddTask(id ? id?.toString() : "", newTask);
            setName("");
            setDescription("");
            setStartDate("");
            setDueDate("");
            setColor("");
          }}
        >
          add task
        </button>
      ) : null}
    </div>
  );
}

function handleDeleteTask(id: string | undefined) {
  async function fn() {
    const res = await fetch(`/api/deletetask/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    console.log(await res.json());
  }
  if (id) fn();
}
function updateTask(id: string | undefined, updated: TaskI | undefined) {
  console.log("idated", updated);
  async function fn() {
    const res = await fetch(`/api/updatetask/${id}`, {
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
function handleAddTask(projectId: string, newTask: TaskI | undefined) {
  console.log("idated", newTask);
  const body = { ...newTask, project: { id: projectId } };
  async function fn() {
    const res = await fetch(`/api/addtask`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log(await res.json());
  }
  if (newTask?.name) fn();
}
