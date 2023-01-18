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
export default function Explorer() {
  const context = useContext(Ctx);
  const [isExpanded, setIsExpanded] = useState("proj");
  const [isExpandedProject, setIsExpandedProject] = useState("");
  const router = useRouter();
  const [activeTask, setActiveTask] = useState("");
  const { projects } = useProjects();
  console.log(isExpandedProject, "proj exp");

  function classnames(item: any) {
    return activeTask === item._id
      ? styles["active-task"] + " " + styles["subitem"]
      : styles["subitem"];
  }
  return (
    <>
      <div
        className={
          context?.darkMode
            ? styles["container-dark"]
            : styles["container-light"]
        }
      >
        {/* <div
          className={styles["header-light"]}
          key={"Favorite"}
          onClick={() => setIsExpanded(isExpanded === "fav" ? "" : "fav")}
        >
          Favorites
          <AiFillCaretDown
            id={isExpanded === "fav" ? styles["active-arrow"] : undefined}
          />
        </div> */}
        {
          // isExpanded == "fav"
          //   ? [1, 2, 3].map((item) => (
          //       <>
          //         <div
          //           className={styles["item-light"]}
          //           key={item}
          //           onClick={() =>
          //             setIsExpandedProject(
          //               isExpandedProject === `fav${item}` ? "" : `fav${item}`
          //             )
          //           }
          //         >
          //           Favorite Project {item}
          //           <AiFillCaretDown
          //             id={
          //               isExpandedProject === "fav" + item
          //                 ? styles["active-arrow"]
          //                 : undefined
          //             }
          //           />
          //         </div>
          //         {/* // sublisst */}
          //         {isExpandedProject === `fav${item}` ? (
          //           <div>
          //             {[1, 2, 3, 4, 5].map((item) => (
          //               <div
          //                 key={`sub-item-${item}`}
          //                 className={styles["subitem-light"]}
          //                 onClick={() => router.push("/task/" + item)}
          //               >
          //                 <p>Task {item}</p>
          //               </div>
          //             ))}
          //           </div>
          //         ) : null}
          //       </>
          //     ))
          //   : null
        }

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
        {isExpanded == "pro"
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
  const [loading, setLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);

  async function fetchProjects() {
    const res = await fetch("/api/getprojects");
    const projects = await res.json();
    setData(projects);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects: data };
}
