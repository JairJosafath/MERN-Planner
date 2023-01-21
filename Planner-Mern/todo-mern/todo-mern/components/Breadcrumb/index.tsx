import styles from "./bc.styles.module.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import Button from "../Button";

const crumbs = [
  { label: "Home", path: "/" },
  { label: "Project", path: "/project/" },
  { label: "Task", path: "/task/" },
];
export default function Breadcrumb() {
  const route = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {route.pathname !== "/" ? (
          <Button variant="text">
            <AiOutlineArrowLeft onClick={() => route.back()} />
          </Button>
        ) : null}
        {route.pathname === "/" ? <p>Home</p> : null}
        {route.pathname.includes("/project/") ? (
          <>
            <Button variant="text" onClick={() => route.push("/")}>
              Home
            </Button>
            <p>Project</p>
          </>
        ) : null}
        {route.pathname.includes("/task/") ? (
          <>
            <Button variant="text" onClick={() => route.push("/")}>
              Home
            </Button>
            <Button variant="text" onClick={() => route.back()}>
              Project
            </Button>
            <p>Task</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
