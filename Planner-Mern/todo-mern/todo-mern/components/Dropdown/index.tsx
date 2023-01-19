import styles from "./dropdown.styles.module.scss";
import { useRef, useState, useEffect, RefObject, MouseEvent } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  items: { label: string; onClick: () => void }[];
}

export default function Dropdown({
  items,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  const className = `${styles.content} ${styles[variant]} ${styles[size]}`;

  return (
    <div className={styles.wrapper}>
      <div className={className}>
        <div>
          <button {...props} />
          <div>
            <AiOutlineDown />
          </div>
        </div>

        <ul>
          {items.map(({ label, onClick }, index) => (
            <li key={index} onClick={onClick}>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
