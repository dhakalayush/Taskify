"use client"; // This is a client component

import Calender from "./Calender/page";
import Filemanagement from "./Filemanagement/page.js";
import Priority from "./Priority/page.js"
import "react-calendar/dist/Calendar.css";
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
          <Calender />
        </div>
        <div className={styles.prioritycon}>
          <div className={styles.imp}>Priority Task</div>
          <Priority />
        </div>
      </div>
      <div className={styles.filecon}>
        <div className={styles.files}>File Preview</div>
        <Filemanagement />
      </div>
    </div>
  );
}
