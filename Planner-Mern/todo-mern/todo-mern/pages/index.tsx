import Head from "next/head";
import { Inter } from "@next/font/google";
import { Project as ProjectInterface } from "../types/types";
import Card from "../components/Card";
import styles from "../styles/layouts.module.scss";
import Header from "../components/Card.Header";
import Input from "../components/Input";
import Project from "../components/Project";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  projects: ProjectInterface[];
}

export default function Home({ projects }: Props) {
  const [reload, setReload] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (reload) router.replace(router.pathname);
    setReload(false); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  return (
    <>
      <Head>
        <title>NextPlanner</title>
        <meta name="description" content="Make your plans work for you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        {projects.map((project: ProjectInterface) => (
          <Project key={project._id} project={project} setReload={setReload} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3001/api/getprojects`);

  const data = await res.json().catch((e) => console.error(e));
  const projects: ProjectInterface[] = data.body.projects;
  return { props: { projects } };
}
