import styles from "./day.styles.module.scss";
import { Project, Task, Todo } from "../../types/types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  active: boolean;
  entities: Project[] | Task[] | Todo[];
}
export default function Day({ date, active, entities, ...props }: Props) {
  const activeProjects: Project[] | Task[] | Todo[] = entities?.filter(
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
              className={styles["day-project"]}
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
