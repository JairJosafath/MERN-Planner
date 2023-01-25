import { Dispatch, SetStateAction, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Menu from "../Menu";
import styles from "./cp.styles.module.scss";

interface Props {
  color: string | undefined;
  setColor: Dispatch<
    SetStateAction<
      | {
          key:
            | "color"
            | "name"
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
const basicColors = ["red", "green", "blue", "yellow", "orange", "pink"];
export default function Colorpicker({ color, setColor }: Props) {
  const [show, setShow] = useState(false);
  const [customColor, setCustomColor] = useState("");
  return (
    <>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.circle}
          style={{ background: color }}
          onClick={() => setShow(!show)}
        />
        {show ? (
          <div className={styles.picker}>
            <div className={styles.grid}>
              {basicColors.map((color) => (
                <div
                  key={color}
                  style={{ background: color }}
                  className={styles.circle}
                  onClick={() => {
                    setShow(false);
                    setColor({ key: "color", value: color, body: { color } });
                  }}
                />
              ))}
            </div>
            <Input
              placeholder={"or a custom color!!"}
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
            />
            <div className={styles.flex}>
              <Button
                size={"sm"}
                onClick={() => {
                  setShow(false);
                  setColor({
                    key: "color",
                    value: customColor,
                    body: { color: customColor },
                  });
                  setCustomColor("");
                }}
              >
                Ok
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
