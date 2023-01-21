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
}
/**
 * statefull text input
 */
export default function Input({
  uploaded = false,
  loading = false,
  error = false,
  ...props
}: Props) {
  const ctx = useContext(Darkmode);
  const classnames = `${styles.content}
  ${loading ? styles.loading : ""}
        ${uploaded ? styles.success : ""}
        ${error ? styles.error : ""} ${
    ctx?.darkmode ? styles["input-dark"] : styles["input-light"]
  }
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
