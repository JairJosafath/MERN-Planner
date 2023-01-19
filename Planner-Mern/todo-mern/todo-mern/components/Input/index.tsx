import {
  AiOutlineCheck,
  AiOutlineLoading,
  AiOutlineClose,
} from "react-icons/ai";
import styles from "./input.styles.module.scss";
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
  const classnames = `${styles.content}
  ${loading ? styles.loading : ""}
        ${uploaded ? styles.success : ""}
        ${error ? styles.error : ""}
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
