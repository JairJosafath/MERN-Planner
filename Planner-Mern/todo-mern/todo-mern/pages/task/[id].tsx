import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
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
  const [todos, setTodos] = useState(data?.task?.todos);

  const [mode, setMode] = useState("card");
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
  useEffect(() => {
    if (data?.task) setTodos(data?.task?.todos);
  }, [data?.task]);

  return (
    <>
      <div>
        <h1> {data?.task?.name}</h1>
      </div>
      <Controlbar
        action={"addtodo"}
        setReload={setReload}
        mode={mode}
        setMode={setMode}
      />
      {mode === "card" ? (
        <>
          <div className={styles.grid}>
            {todos?.map((todo: TodoInterface) => (
              <Todo key={todo._id} todo={todo} setReload={setReload} />
            ))}
          </div>
        </>
      ) : null}
      {mode === "calendar" ? (
        <>
          <div className={styles.containercal}>
            <Calendar entities={data?.task?.todos} type={"task"} />
          </div>
        </>
      ) : null}
    </>
  );
}
