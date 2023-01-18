import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDownSquare,
  AiFillSetting,
  AiFillTool,
} from "react-icons/ai";
import styles from "../../styles/components/explorer/explorer.module.scss";
import { Ctx } from "../Layout";
import { Project as ProjectI } from "../../types/types";
export default function Explorer() {
  const context = useContext(Ctx);
  const [isExpanded, setIsExpanded] = useState("pro");
  const [isExpandedProject, setIsExpandedProject] = useState("");
  const router = useRouter();
  const [activeTask, setActiveTask] = useState("");
  const { projects, setReload, reload } = useProjects();
  console.log(isExpandedProject, "proj exp");

  function classnames(item: any) {
    return activeTask === item._id
      ? styles["active-task"] + " " + styles["subitem"]
      : styles["subitem"];
  }

  useEffect(() => {
    setReload(true);
    console.log("issgoin");
  }, [router, setReload]);
  return (
    <>
      <div
        className={
          context?.darkMode
            ? styles["container-dark"]
            : styles["container-light"]
        }
      >
        <div className={styles["header"]} key={"Projects"}>
          <p onClick={() => setIsExpanded(isExpanded === "pro" ? "" : "pro")}>
            Projects
          </p>
          <div>
            <AiFillSetting onClick={() => router.push("/projects")} />
            <AiFillCaretDown
              id={isExpanded === "pro" ? styles["active-arrow"] : undefined}
              onClick={() => setIsExpanded(isExpanded === "pro" ? "" : "pro")}
            />
          </div>
        </div>
        {isExpanded === "pro"
          ? projects?.body.projects.map((item: any) => (
              <>
                <div
                  className={styles["item"]}
                  key={`project-item-${item._id}`}
                  onClick={() =>
                    setIsExpandedProject(
                      isExpandedProject === `pro${item._id}`
                        ? ""
                        : `pro${item._id}`
                    )
                  }
                >
                  {item.name}
                  <AiFillCaretDown
                    id={
                      isExpandedProject === "pro" + item._id
                        ? styles["active-arrow"]
                        : undefined
                    }
                  />
                </div>
                {/* // sublisst */}
                {isExpandedProject === `pro${item._id}` ? (
                  <div>
                    {item.tasks.map((item: any) => (
                      <div
                        key={`project-sub-item-${item._id}`}
                        className={classnames(item)}
                        onClick={() => {
                          router.push("/task/" + item._id);
                          setActiveTask(item._id);
                        }}
                      >
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ))
          : null}
      </div>
    </>
  );
}

function useProjects() {
  const [data, setData] = useState<any>();
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);

  async function fetchProjects() {
    const res = await fetch("/api/getprojects");
    const projects: ProjectI[] = await res.json();
    setData(projects);
  }

  useEffect(() => {
    console.log(reload, "reload");
    if (reload) {
      fetchProjects();
      setReload(false);
    }
  }, [reload]);

  return { projects: data, setReload, reload };
}
