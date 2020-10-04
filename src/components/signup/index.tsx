import ThemeContext from "../../contexts";
import { useContext } from "react";
import { useRouter } from "next/router";
import { signup } from "../../api/mutations";
import { getCommonStyle } from "../login/getCommonStyle";
import useAuth from "../../hooks/useAuth";
import { Spin } from "antd";
import { useState } from "react";

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const { setAuthData } = useAuth();
  const [loading, setLoading] = useState(false);

  const goToLogin = () => router.push("/login");

  const Logo = () => (
    <div className="logo-container">
      <img className="logo" src="/logo.png" />
    </div>
  );

  const handleSignUp = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    if (email.length === 0 || password.length === 0) {
      alert("Email or password cannot be empty");
      return;
    }

    setLoading(true);
    signup(username, email, password)
      .then((data) => {
        setLoading(false);
        if (data.createUser.userId) {
          setAuthData(data.createUser);
          router.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.errors[0].message);
      });
  };

  const SignUpForm = () => (
    <form className="email-password-inputs" onSubmit={handleSignUp}>
      <label className="login-label">Sign Up</label>
      <input placeholder="Username" className="input" name="username" />
      <input placeholder="Email" className="input" name="email" />
      <input
        placeholder="Password"
        type="password"
        className="input"
        name="password"
      />
      <button className="login-button" type="submit">
        Sign up
      </button>
    </form>
  );

  const AlreadyHaveAnAccount = () => (
    <div className="already-have-message">
      <div>Already have an account?</div>
      <div>
        Or login using <b>Google/Github</b> account?
      </div>
      <div className="login-message" onClick={goToLogin}>
        Log In
      </div>
    </div>
  );

  /**
   * Final JSX return
   */
  return (
    <>
      <style>{getStyle(theme)}</style>
      <Spin spinning={loading} size="large">
        <div className="page-container">
          <div className="box">
            <Logo />
            <SignUpForm />
            <AlreadyHaveAnAccount />
          </div>
        </div>
      </Spin>
    </>
  );
};

const getStyle = (colors: any) => {
  const { color1 } = colors;
  return ` 
    ${getCommonStyle(colors)}
    .already-have-message {
      width:250px;
      margin:auto;
      font-size:12px;
      text-align:center;
    }
    .login-message {
      color:${color1};
      font-weight:bold;
      font-size:13px;
      cursor:pointer;
    }
`;
};
export default SignUp;
