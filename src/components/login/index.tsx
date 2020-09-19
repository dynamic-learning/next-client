import ThemeContext from "../../contexts";
import { useContext } from "react";
import { useRouter } from "next/router";
import { login } from "../../api/queries";
import Cookies from "universal-cookie";
import { getCommonStyle } from "./getCommonStyle";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const cookies = new Cookies();

  const goToSignUp = () => router.push("/signup");

  const Logo = () => (
    <div className="logo-container">
      <img className="logo" src="/logo.png" />
    </div>
  );

  const GithubAndGoogleIcons = () => (
    <>
      <div className="OR">OR</div>
      <div className="oauth-icons-container">
        <img className="github bright-on-hover" src="github.png" />
        <img className="google bright-on-hover" src="google.png" />
      </div>
    </>
  );

  const handleLogin = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length === 0 || password.length === 0) {
      alert("Email or password cannot be empty");
      return;
    }

    login(email, password)
      .then((data) => {
        alert("Login successful");
        cookies.set("auth-token", data.login.token, {
          path: "/",
          maxAge: data.login.tokenExpiration * 60 * 60,
        });
        // Use cookies.get('auth-token') to get access to token
      })
      .catch((err) => {
        alert(err.response.errors[0].message);
      });
  };

  const LoginForm = () => (
    <form className="email-password-inputs" onSubmit={handleLogin}>
      <label className="login-label">Log In</label>
      <input placeholder="Email" className="input" name="email" />
      <input
        placeholder="Password"
        type="password"
        className="input"
        name="password"
      />
      <button className="login-button" type="submit">
        Login
      </button>
    </form>
  );

  const CreateNewAccount = () => (
    <div className="new-account-message">
      <span>Don't have an account ?</span>
      <span className="create-new" onClick={goToSignUp}>
        {" "}
        Create new
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
          <LoginForm />
          <GithubAndGoogleIcons />
          <CreateNewAccount />
        </div>
      </div>
    </>
  );
};

const getStyle = (colors: any) => {
  const { color1, color5 } = colors;
  return `
    ${getCommonStyle(colors)}
    .github.bright-on-hover {
      width:67px;
      height:67px;
      margin:right:2rem;
      cursor:pointer;
    }
    .google.bright-on-hover {
      width:65px;
      height:67px;
      margin-left:2rem;
      cursor:pointer;
    }
    .bright-on-hover:hover {
      filter:brightness(1.3);
    }
    .OR {
      width:20px;
      margin:auto;
      color:${color5};
      font-weight:bold;
    }
    .oauth-icons-container {
      display:flex;
      flex-direction:row;
      justify-content:center;
    }
    .new-account-message {
      width: fit-content;
      padding: 15px 0;
      margin:auto;
      font-size:12px;
    }
    .create-new {
      color:${color1};
      font-weight:bold;
      font-size:13px;
      cursor:pointer;
    }
`;
};

export default Login;
