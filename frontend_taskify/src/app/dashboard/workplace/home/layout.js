import Worksidebar from "./Worksidebar/page";
import styles from "./page.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.containeree}>
      <div className={styles.menu}>
      {children}
      </div>
      <div className={styles.contents}>
       
        <Worksidebar />
      </div>
    </div>
  );
};
export default Layout;
