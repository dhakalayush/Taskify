import styles from "./page.module.css";
import Navbar from "./navbar/page.js";

export default function LandingPage() {
  return (
    <>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.main}></div>
    </>
  );
}
