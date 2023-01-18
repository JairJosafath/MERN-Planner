import { useRouter } from "next/router";
import {
  AiFillCheckSquare,
  AiFillPlusCircle,
  AiOutlineExclamation,
  AiOutlineMore,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import styles from "../../styles/components/task/task.module.scss";
import AddTodo from "../../components/addTodo";
import { useState, useEffect } from "react";
import { Task as Taski, Todo as TodoI } from "../../types/types";
import Todo from "../../components/Todo";

interface Props {
  task: Taski;
}
export default function Task({ task }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [shownewTodo, setShownewTodo] = useState(false);
  const [showmenu, setShowMenu] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      router.replace(router.asPath);
      setReload(false);
    }
  }, [reload, router]);

  return (
    <>
      <div
        className={styles.wrapper}
        onClick={() => (showmenu ? setShowMenu("") : null)}
      >
        <h1> Task : {task?.name}</h1>

        <div className={styles.controls}>
          <h2>Todos:</h2>

          <AiFillPlusCircle
            onClick={() => setShownewTodo(!shownewTodo)}
            className={shownewTodo ? styles.rotated : undefined}
          />
        </div>
        {shownewTodo ? <Todo setReload={setReload} /> : null}
        <ul className={styles.grid}>
          {task?.todos?.map((todo: TodoI) => (
            <Todo key={todo?._id} todo={todo} setReload={setReload} />
          ))}
        </ul>
      </div>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id: string = context.params.id;
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/api/gettask/${id}`);
  const data = await res.json();
  const task: Taski = data.body.task;
  console.log(task);

  // Pass data to the page via props
  return { props: { task } };
}
