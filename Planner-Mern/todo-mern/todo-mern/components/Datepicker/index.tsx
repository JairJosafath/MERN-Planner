import { Dispatch, SetStateAction } from "react";
import styles from "./dp.styles.module.scss";
interface Props {
  label: string;
  date: string | undefined;
  setDate: Dispatch<
    SetStateAction<
      | {
          key:
            | "title"
            | "description"
            | "status"
            | "color"
            | "priority"
            | "startDate"
            | "dueDate";
          value: string | number;
          body: object;
        }
      | undefined
    >
  >;
}
export default function Datepicker({ label, setDate, date }: Props) {
  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <label>{label}</label>
        <input
          type={"date"}
          value={date}
          onChange={(e) =>
            setDate({
              key: label === "Start Date" ? "startDate" : "dueDate",
              value: e.target.value,
              body:
                label === "Start Date"
                  ? { startDate: e.target.value }
                  : { dueDate: e.target.value },
            })
          }
        />
      </div>
    </div>
  );
}
