import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
      <Controlbar action={"addtask"} setReload={setReload} />
      <div className={styles.grid}>
        {project?.tasks?.map((task: TaskInterface) => (
          <Task key={task._id} task={task} setReload={setReload} />
        ))}
      </div>
    </>
  );
}
