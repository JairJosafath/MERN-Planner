import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import Controlbar from "../../components/Controlbar";
import Task from "../../components/Task";
import { useFecth } from "../../hooks/useFetch";
import styles from "../../styles/layouts.module.scss";
import {
  Project as ProjectInterface,
  Task as TaskInterface,
} from "../../types/types";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const { data, setReq } = useFecth();
  const [reload, setReload] = useState(false);
  const [mode, setMode] = useState("card");
  const project: ProjectInterface = data?.project;
  useEffect(() => {
    if (reload) {
      setReq({
        url: `/api/getProject/${id}`,
      });
      setReload(false);
    }
  }, [id, reload, setReq]);
  useEffect(() => {
    setReq({
      url: `/api/getProject/${id}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1> {project?.name}</h1>
      </div>
      <Controlbar
        action={"addtask"}
        setReload={setReload}
        mode={mode}
        setMode={setMode}
      />

      {mode === "card" ? (
        <>
          <div className={styles.grid}>
            {project?.tasks
              ?.sort((a, b) => (a._id && b._id ? (a._id > b._id ? -1 : 1) : 0))
              .map((task: TaskInterface) => (
                <Task key={task._id} task={task} setReload={setReload} />
              ))}
          </div>
        </>
      ) : null}
      {mode === "calendar" ? (
        <>
          <div className={styles.containercal}>
            <Calendar entities={project?.tasks} type={"task"} />
          </div>
        </>
      ) : null}
    </>
  );
}
