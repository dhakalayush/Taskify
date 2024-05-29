import React from "react";
import styles from "./page.module.css"
import Link from "next/link";
export default function Workplace(){
    return(
        <div className={styles.container1}>
         <div className={styles.title}>
          <p>Workplace</p>
          </div>
          <div className={styles.container2}>
            <Link href="/dashboard/workplace/home"
           className={styles.workplace1}>Workplace 1
           </Link>
          </div>
          <div className={styles.container3}>
          <Link href="/dashboard/workplace/home" className={styles.workplace2}>Workplace 2</Link>  
          </div>
        </div>
    );
}