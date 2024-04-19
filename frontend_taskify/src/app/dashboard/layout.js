import Nvbr from "./nvbr/page";
import Sdbr from "./sdbr/page";
import styles from "./page.module.css";

const Layout = ({ children }) => {
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
