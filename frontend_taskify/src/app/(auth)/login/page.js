import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Left page */}
      <div className={styles.main2}>
        <h1 className={styles.left_head}>
          Organize your work and life,finally
        </h1>
        <p className={styles.left_btm}>
          Become focused,organized, and calm with TASKify.
          <br />
          The world's #1 user-friendly Task Manager.
        </p>
      </div>

      {/* Right page */}
      <div className={styles.main4}>
        <h1 className={styles.logo}>TASKify</h1>
        <div className={styles.form}>
          <h1 className={styles.fmhd}>LOG IN</h1>
          <h3 className={styles.heading}>
            Use one of the services to continue with TASKify
          </h3>

          {/* Username Input */}
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" required />

          {/* Password Input */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          {/* Login Button */}
          <button className={styles.pbtn}>LOGIN</button>
          <button className={styles.pbtn}>
            <a href="/dashboard" className={styles.lo}>
              LOGIN
            </a>
          </button>
          <span className={styles.or}>OR </span>

          {/* Continue with Mail Button */}
          <button className={styles.sbtn}>Continue with Mail</button>

          {/* Sign Up Link */}
          <p>
            Don't have an account? <a href="/">Sign up</a>
          </p>
        </div>

        {/* Terms and Privacy */}
        <p className={styles.btmtxt}>
          By continuing, you agree to TASKify's <u>Terms of Use</u>
          <br />
          Read our <u>Privacy Policy</u>.
        </p>
      </div>
    </div>
  );
}
