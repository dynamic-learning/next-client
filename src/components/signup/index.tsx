import ThemeContext from "../../contexts";
import { useContext } from "react";
import { useRouter } from "next/router";
import { signup } from "../../api/mutations";
import { getCommonStyle } from "../login/getCommonStyle";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const { setAuthData } = useAuth();

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

    signup(username, email, password)
      .then((data) => {
        if (data.createUser.userId) {
          setAuthData(data.createUser);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
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
      <span>Already have an account?</span>
      <span className="login-message" onClick={goToLogin}>
        {" "}
        Log In
      </span>
    </div>
  );

  /**
   * Final JSX return
   */
  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="page-container">
        <div className="box">
          <Logo />
          <SignUpForm />
          <AlreadyHaveAnAccount />
        </div>
      </div>
    </>
  );
};

const getStyle = (colors: any) => {
  const { color1 } = colors;
  return ` 
    ${getCommonStyle(colors)}
    .already-have-message {
      width:200px;
      margin:auto;
      font-size:12px;
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
