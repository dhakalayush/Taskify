"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    router.push("/login"); // Redirect to the login page after logout
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>TASKify</h1>
      </div>
      <div className={styles.container2}>
        <div className={styles.items}>
          <Link href="/dashboard" className={styles.item1}>
            Dashboard
          </Link>
          <Link href="/dashboard/activities" className={styles.item2}>
            Activities
          </Link>
          <Link href="/dashboard/chart" className={styles.item3}>
            Chart
          </Link>
          <Link href="/dashboard/workplace" className={styles.item4}>
            Workplace
          </Link>
         
          <button onClick={handleLogout} className={styles.item5}>
            Logout
          </button>
          {/* <button onClick={handleLogout} className={styles.item5}>
            Log Out
          </button> */}
        </div>
      </div>
    </div>
  );
}
