import {
  AiOutlineCheck,
  AiOutlineLoading,
  AiOutlineClose,
} from "react-icons/ai";
import styles from "./input.styles.module.scss";
import { useContext } from "react";
import { Darkmode } from "../../pages/_app";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  uploaded?: boolean;
  loading?: boolean;
  error?: boolean;
  inputSize?: "sm" | "md" | "lg";
}
/**
 * statefull text input
 */
export default function Input({
  uploaded = false,
  loading = false,
  error = false,
  inputSize = "md",
  ...props
}: Props) {
  const ctx = useContext(Darkmode);
  const classnames = `${styles.content}
  ${loading ? styles.loading : ""}
        ${uploaded ? styles.success : ""}
        ${error ? styles.error : ""} ${
    ctx?.darkmode ? styles["input-dark"] : styles["input-light"]
  } ${inputSize === "sm" ? styles["sm"] : ""} ${
    inputSize === "md" ? styles["md"] : ""
  } ${inputSize === "lg" ? styles["lg"] : ""}
  `;
  return (
    <div className={styles.wrapper}>
      <div className={classnames}>
        <input {...props} />
        {loading ? <AiOutlineLoading /> : null}
        {uploaded ? <AiOutlineCheck /> : null}
        {error ? <AiOutlineClose /> : null}
      </div>
    </div>
  );
}
