import styles from "./page.module.css";
import Navbar from "./navbar/page.js";

export default function LandingPage() {
  return (
    <>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.main}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem1}>
            <p className={styles.text}>
              Say Goodbye to chaos
              <br /> &<br />
              Hello to Organization
            </p>
            <h2 className={styles.bold}>
              Boost Your Productivity with TASKify
            </h2>
            <a href="/login" className={styles.btn}>
              Get Started
            </a>
          </div>
          <div className={styles.gridItem2}>
            <h2 className={styles.about}> About </h2>
            <p className={styles.us}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
              <br />
              aspernatur vitae optio commodi est repellendus ab quia ex fugit
              <br />
              doloremque dolorem ad aliquam, rem eum doloribus! Molestiae
              <br />
              consequatur cum laboriosam.
            </p>
            <div className={styles.coll}>
              <img src="/img/1.jpg" className={styles.minion1}></img>
              <img src="/img/2.webp" className={styles.minion2}></img>
              <img src="/img/3.jpg" className={styles.minion3}></img>
              <img src="/img/4.jpg" className={styles.minion4}></img>
            </div>
          </div>
          <div className={styles.gridItem3}>
            <h1>Features</h1>
          </div>
          <div className={styles.gridItem4}>
            <h2 className={styles.chat}>Lets's Chat</h2>
            <p className={styles.learn}>
              {" "}
              We would love to learn more about you.
            </p>
            <span>
              <h3>
                Email us at <br />
                hello@taskify.com
              </h3>
            </span>
          </div>
        </div>
        <footer className={styles.footer}>
          <p>&copy; 2024 Taskify. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
