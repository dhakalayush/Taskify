"use client";

import Nvbr from "./nvbr/page";
import Sdbr from "./sdbr/page";
import styles from "./page.module.css";
import { useEffect } from "react";
import { isAuthenticated } from "../(auth)/auth";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    // Check if the user is authenticated, if not, redirect to login page
    if (!isAuthenticated()) {
      router.push("/login"); // Redirect to the login page
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sdbr />
      </div>
      <div className={styles.contents}>
        <Nvbr />
        {children}
      </div>
    </div>
  );
};
export default Layout;
