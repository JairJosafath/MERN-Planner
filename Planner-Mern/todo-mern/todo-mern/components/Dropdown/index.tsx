import styles from "./dropdown.styles.module.scss";
import { useRef, useState, useEffect, RefObject, MouseEvent } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  items: { label: string; onClick: () => void }[];
  selected: string;
  /**
   * allows user to control collapse state from outside clicks
   */
  collapse?: boolean;
}

export default function Dropdown({
  items,
  variant = "primary",
  size = "md",
  collapse = false,
  selected = items[0].label,
  ...props
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const className = `${styles.content} ${styles[variant]} ${styles[size]} ${
    expanded && !collapse ? styles.expanded : ""
  } ${!expanded || collapse ? styles.collapsed : ""}`;

  return (
    <div className={styles.wrapper}>
      <div className={className}>
        <div onClick={() => setExpanded(!expanded)}>
          <button {...props}>{selected}</button>
          <AiOutlineDown id={styles.drop} />
        </div>

        <ul className={`${expanded ? styles.expanded : ""}`}>
          {items.map(({ label, onClick }, index) => (
            <li
              key={index}
              onClick={() => {
                onClick();
                setExpanded(false);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
