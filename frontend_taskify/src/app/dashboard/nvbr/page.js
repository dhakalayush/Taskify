import styles from "./page.module.css";
import { MdNotifications, MdSearch, MdChat } from "react-icons/md"; // Corrected icon name for chat

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <MdSearch />
        <input type="text" placeholder="Search Here" className={styles.input} />
      </div>

      <div className={styles.user}>
        <div className={styles.icons}>
          <MdChat size={40} /> {/* Corrected icon name for chat */}
          <MdNotifications size={40} />
        </div>
        <div className={styles.profile}>
          <img
            className={styles.userimg}
            src="/img/user.jpg"
            alt=""
            height={60}
            width={60}
          />
          <span className={styles.title}>Alex Al</span>
        </div>
      </div>
    </div>
  );
}
