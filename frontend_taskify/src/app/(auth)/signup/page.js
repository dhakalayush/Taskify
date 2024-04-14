"use client"; // This is a client component

import styles from "./page.module.css";
import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/signup", { fullname, email,username, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

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
          <h1 className={styles.fmhd}>SIGNUP</h1>
          <h3 className={styles.heading}>
            Use one of the services to continue with TASKify
          </h3>

          {/* Username Input */}
          <form onSubmit={handleSubmit}>

            {/* Password Input */}
            <label htmlFor="full name">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="full name"
              placeholder="Full Name"
              required
              onChange={(e) => setFullName(e.target.value)}
            />


            {/* Password Input */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password Input */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Password Input */}
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            {/* Login Button */}
            <button type="submit" className={styles.pbtn}>
            SIGNUP
            </button>
          </form>

          {/* Sign Up Link */}
          <p>
            Already have an account? <a href="/login">Login</a>
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
};
export default Home;

