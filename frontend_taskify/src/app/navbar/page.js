import styles from "./page.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>TASKify</h1>
      </div>
      <div className={styles.linksContainer}>
        <a href="/" className={styles.link}>
<<<<<<< HEAD
          About
        </a>
        <a href="/" className={styles.link}>
          Contact
        </a>
        <a href="/" className={styles.link}>
          Portfolio
        </a>
        <a href="/" className={styles.link}>
          More
        </a>
=======
          Home
        </a>
        <a href="/" className={styles.link}>
          About
        </a>
        <a href="/" className={styles.link}>
          Features
        </a>
        <a href="/" className={styles.link}>
          Contact
        </a>
>>>>>>> 344b52d (updated)
      </div>
    </div>
  );
}
