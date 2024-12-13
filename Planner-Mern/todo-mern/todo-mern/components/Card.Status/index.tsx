import { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCheckSquare,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
  AiOutlineLoading,
  AiOutlineMore,
  AiTwotoneCheckSquare,
} from "react-icons/ai";
import styles from "./status.styles.module.scss";
interface Props {
  success: boolean;
  loading: boolean;
  error: boolean;
}
export default function Status({ success, loading, error }: Props) {
  const classnames = `${styles["content-status"]}
  ${loading ? styles.loading : ""}
        ${success ? styles.success : ""}
        ${error ? styles.error : ""}
  `;
  return (
    <>
      <div className={classnames}>
        {success ? <AiOutlineCheck /> : null}
        {loading ? <AiOutlineLoading /> : null}
        {error ? <AiOutlineClose /> : null}
      </div>
    </>
  );
}
