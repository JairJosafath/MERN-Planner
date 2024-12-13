import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useFecth } from "../../hooks/useFetch";
import {
  Entity,
  Project as ProjectInterface,
  Task,
  Todo,
} from "../../types/types";
import { months, years } from "../../util";
import Button from "../Button";
import Day from "../Calendar.Day";
import Dropdown from "../Dropdown";
import styles from "./c.styles.module.scss";

interface Props {
  entities: Entity[] | undefined;
  type: string;
}
export default function Calendar({ entities, type }: Props) {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [start, setStart] = useState(currentDate.getDay());
  const allMonths = months(currentYear);
  const yearItems = () => {
    let temp: { label: string; onClick: () => void }[] = [];
    years(currentYear).map((year: number) =>
      temp.push({
        label: year.toString(),
        onClick() {
          setCurrentYear(year);
        },
      })
    );
    return temp;
  };
  const monthItems = () => {
    let temp: { label: string; onClick: () => void }[] = [];
    for (let i = 0; i < 12; i++)
      temp.push({
        label: allMonths[i].label,
        onClick() {
          setCurrentMonth(i);
        },
      });

    return temp;
  };
  const days = [
    { label: "Sunday" },
    { label: "Monday" },
    { label: "Tuesday" },
    { label: "Wednesday" },
    { label: "Thurstday" },
    { label: "Friday" },
    { label: "Saturday" },
  ];
  //   console.log(new Date(2023, 11, 1).getDay());
  const daysDivs = () => {
    let days: number[] = [];
    const max: number = start + allMonths[currentMonth].days > 35 ? 42 : 35;
    for (let i = 0; i < max; i++) {
      days.push(i);
    }
    return days;
  };

  useEffect(() => {
    setStart(new Date(currentYear, currentMonth, 1).getDay());
  }, [currentYear, currentMonth]);

  return (
    <>
      <div className={styles["calendar-wrapper"]}>
        <div className={styles["calendar-content"]}>
          <div className={styles["calendar-header"]}>
            <AiOutlineArrowLeft
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
            />
            <div>
              <div>
                <Dropdown
                  variant="outline"
                  items={yearItems()}
                  selected={currentYear.toString()}
                />
              </div>

              <Dropdown
                variant="outline"
                items={monthItems()}
                selected={allMonths[currentMonth].label}
              />
            </div>

            <AiOutlineArrowRight
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
            />
          </div>
          <div className={styles["calendar-header-days"]}>
            {days.map(({ label }) => (
              <div key={label}>
                {window.innerWidth < 760 ? label.slice(0, 3) : label}
              </div>
            ))}
          </div>
          <div className={styles["calendar-main"] + " " + styles["cal-body"]}>
            {daysDivs().map((day: number) => {
              return (
                <Day
                  key={day}
                  entities={entities}
                  type={type}
                  active={
                    start <= day && day < start + allMonths[currentMonth].days
                  }
                  date={new Date(currentYear, currentMonth, day + 1 - start)}
                  className={`${
                    start <= day && day < start + allMonths[currentMonth].days
                      ? styles["day-in-month"]
                      : styles["day"]
                  } ${
                    new Date().toDateString() ===
                    new Date(currentYear, currentMonth, day + 1).toDateString()
                      ? styles["today"]
                      : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
