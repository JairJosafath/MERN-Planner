import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Controlbar from "../../components/Controlbar";
import Todo from "../../components/Todo";
import { useFecth } from "../../hooks/useFetch";
import styles from "../../styles/layouts.module.scss";
import {
  Task as TaskInterface,
  Todo as TodoInterface,
} from "../../types/types";

export default function Task() {
  const router = useRouter();
  const { id } = router.query;
  const { data, setReq } = useFecth();
  const [reload, setReload] = useState(false);
  const task: TaskInterface = data?.task;
  useEffect(() => {
    if (reload) {
      setReq({
        url: `/api/getTask/${id}`,
      });
      setReload(false);
    }
  }, [id, reload, setReq]);
  useEffect(() => {
    setReq({
      url: `/api/getTask/${id}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1> {task?.name}</h1>
      </div>
      <Controlbar action={"addtodo"} setReload={setReload} />
      <div className={styles.grid}>
        {task?.todos?.map((todo: TodoInterface) => (
          <Todo key={todo._id} todo={todo} setReload={setReload} />
        ))}
      </div>
    </>
  );
}
