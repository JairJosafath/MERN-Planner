import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineExclamation } from "react-icons/ai";
import Menu from "../Menu";

interface Props {
  priority: number | undefined;
  setPriority: Dispatch<
    SetStateAction<
      | {
          key:
            | "color"
            | "title"
            | "description"
            | "status"
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

export default function Prioritypicker({ priority, setPriority }: Props) {
  const priorities = [
    {
      label: "high",
      onClick: () => {
        setPriority({ key: "priority", value: 1, body: { priority: 1 } });
        setShow(false);
      },
    },
    {
      label: "medium",
      onClick: () => {
        setPriority({ key: "priority", value: 2, body: { priority: 2 } });
        setShow(false);
      },
    },
    {
      label: "low",
      onClick: () => {
        setPriority({ key: "priority", value: 3, body: { priority: 3 } });
        setShow(false);
      },
    },
  ];
  const [show, setShow] = useState(false);

  return (
    <>
      <AiOutlineExclamation
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
        style={{
          color: priority === 1 ? "red" : priority === 2 ? "orange" : "grey",
        }}
      />
      <Menu variant="outline" items={priorities} show={show} />
    </>
  );
}
