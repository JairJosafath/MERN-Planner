import styles from "./day.styles.module.scss";
import { Entity, Project, Task, Todo } from "../../types/types";
import { useRouter } from "next/router";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  active: boolean;
  entities: Entity[] | undefined;
  type: string;
}
export default function Day({ date, active, entities, type, ...props }: Props) {
  const router = useRouter();
  const activeProjects: Project[] | Task[] | Todo[] | undefined =
    entities?.filter(
      (entity: Project | Task | Todo) =>
        new Date(entity?.startDate ? entity?.startDate : "").getTime() <=
          date.getTime() &&
        date.getTime() <
          new Date(entity?.dueDate ? entity?.dueDate : "").getTime()
    );
  return (
    <div {...props}>
      <div className={styles["day-wrapper"]}>
        {active ? <h4>{date.getDate()}</h4> : <span>dummy</span>}
        <div className={styles["day-container"]}>
          {activeProjects?.map((entity) => (
            <div
              key={entity?._id}
              style={{
                background: entity?.color ? entity?.color : "grey",
              }}
              className={`${styles["day-project"]} ${
                entity.status === "completed" ? styles["completed"] : ""
              }`}
              onClick={() => {
                if ("tasks" in entity) {
                  router.push(`/project/${entity._id}`);
                } else if ("todos" in entity || type === "task") {
                  console.log("uhmmm");
                  router.push(`/task/${entity._id}`);
                }
              }}
            >
              <p>
                {"title" in entity
                  ? entity?.title
                  : "name" in entity
                  ? entity?.name
                  : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
