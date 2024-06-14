
import React  from "react";
import styles from "./page.module.css"
import Link from "next/link";


export default function Workplace() {
  
    return (
        <div className={styles.container}>
          
            <div className={styles.container2}>
                <div className={styles.side}>
                    <Link href="/dashboard/workplace/home" className={styles.item}>  Home </Link>
                    <Link href="/dashboard/workplace/home/addtask" className={styles.item}>Add Tasks</Link>
                    <Link href="/dashboard/workplace/home/teamembers" className={styles.item}>  Team Members </Link>
                   
                </div>
            </div>
        </div>
    );
}
