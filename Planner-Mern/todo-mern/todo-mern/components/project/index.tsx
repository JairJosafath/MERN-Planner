import { Project as ProjectI } from "../../types/types";
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
  proj?: ProjectI;
}
export default function Project({ proj }: Props) {
  const context = useContext(Ctx);
  const [showmenu, setShowMenu] = useState<string | undefined>("");
  const [showPriorityMenu, setShowPriorityMenu] = useState<string | undefined>(
    ""
  );
  const [showColorMenu, setShowColorMenu] = useState<string | undefined>("");
  const [color, setColor] = useState("");
  const [name, setName] = useState(proj?.name);
  const [description, setDescription] = useState(proj?.description);
  const [startDate, setStartDate] = useState(
    formatDate(proj?.startDate ? proj?.startDate : "")
  );
  const [dueDate, setDueDate] = useState(
    formatDate(proj?.dueDate ? proj?.dueDate : "")
  );
  const [newProject, setNewProject] = useState<ProjectI>();
  const router = useRouter();
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if ((name ? name?.length > 3 : false) && name !== proj?.name && proj?._id)
      timeout = setTimeout(() => {
        updateProject(proj?._id, { name: name });
      }, 1000);
    return () => clearTimeout(timeout);
  }, [name, proj?._id, proj?.name]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (
      (description ? description?.length > 3 : false) &&
      description !== proj?.description &&
      proj?._id
    )
      timeout = setTimeout(() => {
        updateProject(proj?._id, { description: description });
      }, 1000);
    return () => clearTimeout(timeout);
  }, [description, proj?._id, proj?.description]);

  useEffect(() => {
    if (
      formatDate(proj?.startDate ? proj?.startDate : "") !== startDate &&
      proj?._id
    )
      updateProject(proj?._id, { startDate: startDate });
  }, [startDate, proj?._id, proj?.startDate]);
  useEffect(() => {
    if (formatDate(proj?.dueDate ? proj?.dueDate : "") !== dueDate && proj?._id)
      updateProject(proj?._id, { dueDate: dueDate });
  }, [dueDate, proj?._id, proj?.dueDate]);
  useEffect(() => {
    if (!proj?._id) {
      setNewProject({
        name: name,
        description: description,
        startDate: startDate,
        dueDate: dueDate,
        color: color,
      });
    }
  }, [color, description, dueDate, name, proj?._id, startDate]);

  return (
    <div
      key={proj?._id}
      className={
        context?.darkMode ? styles["project-dark"] : styles["project-light"]
      }
      onClick={() => {
        showmenu ? setShowMenu("") : null;
        showPriorityMenu ? setShowPriorityMenu("") : null;
        router.push(`/project/${proj?._id}`);
      }}
    >
      <div className={styles["flex-header"]}>
        <input
          type={"text"}
          value={name}
          placeholder="project name"
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <div
            className={styles["color-circle"]}
            onClick={(e) => {
              e.stopPropagation();
              showColorMenu === proj?._id
                ? setShowColorMenu("")
                : setShowColorMenu(proj?._id);
            }}
            style={{ background: proj?.color ? proj?.color : "grey" }}
          />
          {proj ? (
            <>
              <AiFillExclamationCircle
                color={
                  proj?.priority === 1
                    ? "red"
                    : proj?.priority === 2
                    ? "orange"
                    : "blue"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriorityMenu(proj?._id);
                }}
              />
              <AiFillCheckSquare
                color={proj?.status === "in progress" ? "grey" : "green"}
                onClick={(e) => {
                  e.stopPropagation();
                  updateProject(
                    proj?._id,
                    proj?.status === "in progress"
                      ? { status: "completed" }
                      : { status: "in progress" }
                  );
                }}
              />
              <AiOutlineMore
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(proj?._id);
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      {showmenu === proj?._id ? (
        <menu
          className={styles.menu}
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu("");
          }}
        >
          <ul>
            <li>archive project</li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(proj?._id);
              }}
            >
              delete project
            </li>
          </ul>
        </menu>
      ) : null}
      <div>
        {showmenu === proj?._id ? (
          <menu className={styles.menu} onClick={() => setShowMenu("")}>
            <ul>
              <li>archive project</li>
              <li onClick={() => handleDeleteProject(proj?._id)}>
                delete project
              </li>
            </ul>
          </menu>
        ) : null}
        {showColorMenu === proj?._id ? (
          <menu className={styles.menu}>
            <ul>
              {["red", "green", "blue", "yellow"].map((c, index) => (
                <div
                  key={c}
                  className={styles["color-circle"]}
                  onClick={() => {
                    updateProject(proj?._id, { color: c });
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
                  onClick={() => {
                    if (color) {
                      updateProject(proj?._id, { color: color });
                      setColor("");
                    }
                    setShowColorMenu("");
                  }}
                >
                  Set
                </button>
                <button onClick={() => setShowColorMenu("")}>cancel</button>
              </div>
            </ul>
          </menu>
        ) : null}
        {showPriorityMenu === proj?._id ? (
          <menu className={styles.menu} onClick={() => setShowPriorityMenu("")}>
            <ul>
              {["high", "medium", "low"].map((p, index) => (
                <li
                  key={p}
                  onClick={() =>
                    updateProject(proj?._id, { priority: index + 1 })
                  }
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
      {proj === undefined ? (
        <button
          onClick={() => {
            handleAddProject(newProject);
            setName("");
            setDescription("");
            setStartDate("");
            setDueDate("");
            setColor("");
          }}
        >
          add project
        </button>
      ) : null}
    </div>
  );
}
function handleDeleteProject(id: string | undefined) {
  async function fn() {
    const res = await fetch(`/api/deleteproject/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    console.log(await res.json());
  }
  if (id) fn();
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
function updateProject(id: string | undefined, updated: ProjectI | undefined) {
  console.log("idated", updated);
  async function fn() {
    const res = await fetch(`/api/updateproject/${id}`, {
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
function handleAddProject(newProject: ProjectI | undefined) {
  console.log("idated", newProject);
  async function fn() {
    const res = await fetch(`/api/addproject`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newProject),
    });

    console.log(await res.json());
  }
  if (newProject?.name) fn();
}
