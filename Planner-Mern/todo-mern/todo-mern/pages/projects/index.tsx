import { Project as ProjectI } from "../../types/types";
import styles from "../../styles/components/projects/projects.module.scss";
import {
  AiFillCheckSquare,
  AiFillDelete,
  AiFillExclamationCircle,
  AiFillPlusCircle,
  AiOutlineExclamation,
  AiOutlineMore,
} from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { Ctx } from "../../components/Layout";
import Project from "../../components/Project";
import AddTodo from "../../components/addTodo";
import { Router, useRouter } from "next/router";

interface Props {
  projects: ProjectI[];
}
export default function Projects({ projects }: Props) {
  const router = useRouter();

  const [shownewProject, setShownewProject] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      router.replace(router.asPath);
      setReload(false);
    }
  }, [reload, router]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <h2>Projects:</h2>

        <AiFillPlusCircle
          onClick={() => setShownewProject(!shownewProject)}
          className={shownewProject ? styles.rotated : undefined}
        />
      </div>
      {shownewProject ? (
        <div style={{ marginBottom: "30px" }}>
          <Project setReload={setReload} />
        </div>
      ) : null}
      <div className={styles.content}>
        {projects?.map((proj) => (
          <Project key={proj._id} proj={proj} setReload={setReload} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/api/getprojects`);
  const data = await res.json();
  const projects: ProjectI[] = data.body.projects;

  // Pass data to the page via props
  return { props: { projects } };
}
