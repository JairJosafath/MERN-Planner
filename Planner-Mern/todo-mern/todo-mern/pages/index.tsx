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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, setReq } = useFecth();
  const [reload, setReload] = useState(false);
  const [projects, setProjects] = useState(data?.projects);
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
      <Controlbar action={"addproject"} setReload={setReload} />
      <div className={styles.grid}>
        {projects?.map((project: ProjectInterface) => (
          <Project key={project._id} project={project} setReload={setReload} />
        ))}
      </div>
    </>
  );
}
