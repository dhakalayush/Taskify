"use client"
import styles from "./page.module.css"


export default function Chart() {
    return (
        <div>
        <div className={styles.titlebox}>
                <span className={styles.title}>Charts  
            </span>
             
             
            </div>
            <div className={styles}>
            <div className={styles.carditems}>
                <div className={styles.card}>
                    <span className={styles.details}>To Do Lists
                    <span className={styles.number}>100</span>
                    </span>
                </div>
                <div className={styles.card}>
                    <span className={styles.details}>Ongoing
                    <span className={styles.number}>5</span></span>
                </div>
                <div className={styles.card}>
                    <span className={styles.details}>Completed
                    <span className={styles.number}>20</span></span>
                </div>
               
      </div>
       
    
      </div>
            </div>
    )
     }