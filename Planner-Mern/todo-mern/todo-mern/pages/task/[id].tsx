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
import { useState } from "react";
import { Task as Taski, Todo } from "../../types/types";

interface Props {
  task: Taski;
}
export default function Task({ task }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [shownewTodo, setShownewTodo] = useState(false);
  const [showmenu, setShowMenu] = useState("");
  function handleDeleteTodo(id: string) {
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
  return (
    <>
      <div
        className={styles.wrapper}
        onClick={() => (showmenu ? setShowMenu("") : null)}
      >
        <h1> Task : {task.name}</h1>

        <div className={styles.controls}>
          <h2>Todos:</h2>

          <AiFillPlusCircle
            onClick={() => setShownewTodo(!shownewTodo)}
            className={shownewTodo ? styles.rotated : undefined}
          />
        </div>
        {shownewTodo ? <AddTodo taskId={id} /> : null}
        <ul className={styles.grid}>
          {task?.todos?.map((todo: Todo) => (
            <li key={todo._id}>
              <div>
                <div className={styles["flex-header"]}>
                  <h3>{todo.title}</h3>
                  <div>
                    <div className={styles["color-circle"]} />
                    <AiOutlineExclamation />
                    <AiFillCheckSquare />
                    <AiOutlineMore
                      onClick={() => setShowMenu(todo._id ? todo._id : "")}
                    />
                  </div>
                </div>
                {showmenu === todo._id ? (
                  <menu className={styles.menu} onClick={() => setShowMenu("")}>
                    <ul>
                      <li>archive todo</li>
                      <li
                        onClick={() =>
                          handleDeleteTodo(todo._id ? todo._id : "")
                        }
                      >
                        delete todo
                      </li>
                    </ul>
                  </menu>
                ) : null}

                <p>{todo?.description}</p>
                <h6 key={todo?._id}>
                  {`startdate: ${todo?.startDate}
                  due Date:${todo?.dueDate}`}
                </h6>
              </div>
            </li>
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
