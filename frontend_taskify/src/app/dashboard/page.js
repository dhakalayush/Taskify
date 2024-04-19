import styles from "./page.module.css";
export default function Dashboard() {
  return (
    <div className={styles.containerinside}>
      <div>
        <p className={styles.title}>Dashboard</p>
      </div>
      <div className={styles.tasks}>
        <div className={styles.calencon}>
          <div className={styles.clen}>Calender</div>
        </div>
        <div className={styles.prioritycon}>
          <div className={styles.imp}>Priority Task</div>
        </div>
      </div>
      <div className={styles.filecon}>
        <div className={styles.files}>File Attachment</div>
      </div>
    </div>
  );
}
