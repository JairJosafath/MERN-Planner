import Head from "next/head";
import { Inter } from "@next/font/google";
import { Project as ProjectInterface } from "../types/types";
import Card from "../components/Card";
import styles from "../styles/layouts.module.scss";

import Header from "../components/Card.Header";
import Input from "../components/Input";
import Project from "../components/Project";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Datepicker from "../components/Datepicker";
import Modal from "../components/Modal";
import Controlbar from "../components/Controlbar";
import { ModalCTX } from "./_app";
import { useFecth } from "../hooks/useFetch";
import Calendar from "../components/Calendar";
import { AiOutlineLoading } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, setReq, loading } = useFecth();
  const [reload, setReload] = useState(false);
  const [projects, setProjects] = useState<ProjectInterface[]>(data?.projects);
  const [mode, setMode] = useState("card");
  useEffect(() => {
    if (reload) {
      setReq({
        url: `/api/getprojects`,
      });
      setReload(false);
    }
  }, [reload, setReq]);
  useEffect(() => {
    setReq({
      url: `/api/getprojects`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data) setProjects(data?.projects);
  }, [data]);
  return (
    <>
      <Head>
        <title>NextPlanner</title>
        <meta name="description" content="Make your plans work for you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Controlbar
        action={"addproject"}
        setReload={setReload}
        mode={mode}
        setMode={setMode}
      />

      {loading && !data ? (
        <div className={styles.loading}>
          <AiOutlineLoading />
          <h3>Loading NextPlanner</h3>
        </div>
      ) : null}
      {mode === "card" ? (
        <>
          <div className={styles.grid}>
            {projects?.map((project: ProjectInterface) => (
              <Project
                key={project._id}
                project={project}
                setReload={setReload}
              />
            ))}
          </div>
        </>
      ) : null}
      {mode === "calendar" ? (
        <>
          <div className={styles.containercal}>
            <Calendar entities={projects} type={"project"} />
          </div>
        </>
      ) : null}
    </>
  );
}
