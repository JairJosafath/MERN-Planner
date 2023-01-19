import styles from "./textarea.styles.module.scss";
import {
  AiOutlineCheck,
  AiOutlineLoading,
  AiOutlineClose,
} from "react-icons/ai";
interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // inputsize?:"xs" | "sm" | "md" | "lg" | "xl";
  rows?: number;
  cols?: number;
  uploaded?: boolean;
  loading?: boolean;
  error?: boolean;
}
/**
 * statefull text area
 */
export default function TextArea({
  uploaded = false,
  loading = false,
  error = false,
  rows = 7,
  cols = 40,
  ...props
}: Props) {
  const classnames = `${styles.content} ${loading ? styles.loading : ""} ${
    uploaded ? styles.success : ""
  } ${error ? styles.error : ""}`;
  return (
    <div className={styles.wrapper}>
      <div className={classnames}>
        <textarea rows={rows} cols={cols} {...props} />{" "}
        {loading ? <AiOutlineLoading /> : null}
        {uploaded ? <AiOutlineCheck /> : null}
        {error ? <AiOutlineClose /> : null}
      </div>
    </div>
  );
}
