import ThemeContext from "../../contexts";
import { useContext } from "react";
import { Input } from "antd";

const Login = () => {
  const { theme } = useContext(ThemeContext);

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

  const EmailAndPassword = () => (
    <div className="email-password-inputs">
      <label className="login-label">Log In</label>
      <Input placeholder="Email" className="input" />
      <Input placeholder="Password" type="password" className="input" />
    </div>
  );

  const CreateNewAccount = () => (
    <div className="new-account-message">
      <span>Don't have an account ?</span>
      <span className="create-new"> Create new</span>
    </div>
  );

  const LoginButton = () => <div className="login-button">Log In</div>;

  /**
   * Final JSX return
   */
  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="page-container">
        <div className="box">
          <Logo />
          <EmailAndPassword />
          <LoginButton />
          <GithubAndGoogleIcons />
          <CreateNewAccount />
        </div>
      </div>
    </>
  );
};

const getStyle = ({ color1, color7, color5 }: any) => `
    .page-container {
      width:100vw;
      height:100vh;
      background-color:${color1};
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    .box {
      width:25%;
      background-color:white;
      min-width:300px;
      min-height:470px;
      height:70%;
      margin:auto;
      border-radius:2rem;
      box-shadow:0px 0px 20px rgba(0,0,0,0.4);
      display:flex;
      flex-direction:column;
      justify-content:space-around;
    }
    .input {
      margin-top:0.8rem;
      border-radius:5px;
    }
    .email-password-inputs {
      width:80%;
      margin:auto;
      height:25%;
      display:flex;
      flex-direction:column;
      justify-content:space-around;
    }
    .login-button {
      text-align:center;
      color:white;
      margin:auto;
      width:70px;
      background-color:${color1};
      border-radius:1rem;
      cursor:pointer;
    }
    .login-button:hover {
      background-color:${color7};
    }
    .logo {
      width:100px;
      height:100px;
      margin:auto;
      margin-top:2rem;
    }
    .logo-container {
      display:flex;
      flex-direction:row;
      justify-content:center;
    }
    .login-label {
      margin-left:0.5rem;
      color: ${color5};
      font-weight:bold;
    }
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
      width:200px;
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

export default Login;
