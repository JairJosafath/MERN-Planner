import styles from "./button.styles.module.scss";
import { useRef, useState, useEffect, RefObject, MouseEvent } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Button({
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  const className = `${styles.content} ${styles[variant]} ${styles[size]}`;

  return (
    <div className={styles.wrapper}>
      <div className={className}>
        <button {...props} />
      </div>
    </div>
  );
}
