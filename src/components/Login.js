import React from "react";
import "./login.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="left-part">
        <div className="card">
          {/*left side */}
          <h2>Organize your work and life, finally.</h2>
          <div className="cn">
            <p>
              Become focused, organized, and calm with TASKify. <br />
              The world’s #1 user-friendly Task Manager.
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <div className="right-part">
        <p className="logo">TASKify</p> {/*LOGO*/}
        <div className="login-details">
          <div className="social-login-buttons">
            {/*   LOGIN FORM */}
            <h2>Log In</h2>
            <p>Use one of the services to continue with TASKify</p>
          </div>

          {/*EMAIL*/}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          {/*PASSWORD*/}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* loginBUTTON*/}
          <div className="pmbtn">
            <button type="button" className="loginbtn">
              Log In
            </button>
          </div>

          {/*CONTINUE WITH GOOGLE*/}
          <div className="ores">
            <p>OR</p>
            <button type="button" className="google-login">
              <img src="./google2.png" width={30} height={30} alt="googleimg" />
              Continue with Google
            </button>
          </div>

          {/*SIGN UP*/}
          <div className="Signup">
            <p>
              Don't have an account?{" "}
              <u>
                <br />
                <a href="signup"> Sign Up</a>
              </u>
            </p>
          </div>
        </div>
        {/*BOTTOM TEXT*/}
        <p className="bottom-text">
          By continuing, you agree to TASKify's <u>Terms of Use.</u>
          <br />
          Read our <u>Privacy Policy.</u>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
