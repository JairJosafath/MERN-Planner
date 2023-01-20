import Header from "../Card.Header";
import styles from "./card.styles.module.scss";
export default function Card() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["dark"]}>
        <Header />
      </div>
    </div>
  );
}
