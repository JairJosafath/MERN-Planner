import { Dispatch, SetStateAction } from "react";

export function formatDate(date: string | Date) {
  if (date) {
    const date_obj = new Date(date);

    return `${date_obj.getUTCFullYear()}-${
      date_obj.getUTCMonth() + 1 > 9
        ? date_obj.getUTCMonth() + 1
        : "0" + (date_obj.getUTCMonth() + 1)
    }-${
      date_obj.getUTCDate() > 9
        ? date_obj.getUTCDate()
        : "0" + date_obj.getUTCDate()
    }`;
  } else {
    return "";
  }
}
export function onChangeDelay(
  value: string,
  setState: Dispatch<
    SetStateAction<
      | {
          key: "name" | "description" | "status" | "color" | "priority";
          value: string | number;
        }
      | undefined
    >
  >,
  key: string
) {
  const timeout = setTimeout(() => {
    setState({ key: "name", value: value });
  }, 1000);
  return () => clearTimeout(timeout);
}

export const months = (year: number) => [
  { label: "January", days: 31 },
  { label: "February", days: year % 4 === 0 ? 29 : 28 },
  { label: "March", days: 31 },
  { label: "April", days: 30 },
  { label: "May", days: 31 },
  { label: "June", days: 30 },
  { label: "July", days: 31 },
  { label: "August", days: 31 },
  { label: "September", days: 30 },
  { label: "October", days: 31 },
  { label: "November", days: 30 },
  { label: "December", days: 31 },
];
