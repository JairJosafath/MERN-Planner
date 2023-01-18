import { Project as ProjectI, Task as TaskI } from "../../types/types";
import styles from "../../styles/components/projects/projects.module.scss";
import {
  AiFillCheckSquare,
  AiFillDelete,
  AiFillExclamationCircle,
  AiFillPlusCircle,
  AiOutlineExclamation,
  AiOutlineMore,
} from "react-icons/ai";
import { useContext, useState } from "react";
import { Ctx } from "../../components/Layout";
import AddTodo from "../../components/addTodo";
import Task from "../../components/Task";

interface Props {
  tasks: TaskI[] | undefined;
  projectname: string;
}
export default function Project({ tasks, projectname }: Props) {
  const [shownewTask, setShownewTask] = useState(false);
  return (
    <div className={styles.wrapper}>
      <h1> Project : {projectname ? projectname : ""}</h1>
      <div className={styles.controls}>
        <h2>Tasks:</h2>

        <AiFillPlusCircle
          onClick={() => setShownewTask(!shownewTask)}
          className={shownewTask ? styles.rotated : undefined}
        />
      </div>
      {shownewTask ? (
        <div style={{ marginBottom: "30px" }}>
          <Task />
        </div>
      ) : null}
      <div className={styles.content}>
        {tasks?.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const res = await fetch(
    `http://localhost:3001/api/getproject/${context.params.id}`
  );
  const data = await res.json();
  const project: ProjectI = data.body.project;

  // Pass data to the page via props
  return { props: { tasks: project?.tasks, projectname: project.name } };
}
