import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useFecth } from "../../hooks/useFetch";
import { Project as ProjectInterface } from "../../types/types";
import { months } from "../../util";
import Day from "../Calendar.Day";
import styles from "./c.styles.module.scss";
export default function Calendar() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [start, setStart] = useState(currentDate.getDay());
  const [temp, setTemp] = useState<ProjectInterface>();
  const allMonths = months(currentYear);
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

  const { data, setReq, loading } = useFecth();
  useEffect(() => {
    setReq({ url: "/api/getprojects" });
  }, []);

  useEffect(() => setTemp(data?.projects[0]), [data]);

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
              <h4>{currentYear}</h4>
              <h3>{allMonths[currentMonth]?.label}</h3>
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
              <div key={label}>{label}</div>
            ))}
          </div>
          <div className={styles["calendar-main"] + " " + styles["cal-body"]}>
            {daysDivs().map((day: number) => {
              return (
                <Day
                  key={day}
                  entities={data?.projects}
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
