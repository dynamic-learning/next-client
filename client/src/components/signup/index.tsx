import ThemeContext from "../../contexts";
import { useContext } from "react";
import { Input } from "antd";
import { useRouter } from "next/router";

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const router= useRouter();

  const goToLogin= () => router.push('/login') 

  const Logo = () => (
    <div className="logo-container">
      <img className="logo" src="/logo.png" />
    </div>
  );

  const EmailAndPassword = () => (
    <div className="email-password-inputs">
      <label className="login-label">Sign Up</label>
      <Input placeholder="Username" className="input" />
      <Input placeholder="Email" className="input" />
      <Input placeholder="Password" type="password" className="input" />
    </div>
  );

  const AlreadyHaveAnAccount = () => (
    <div className="already-have-message">
      <span>Already have an account?</span>
      <span className="login-message" onClick={goToLogin}> Log In</span>
    </div>
  );

  const SignupButton = () => <div className="login-button">Sign up</div>;

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
          <SignupButton />
          <AlreadyHaveAnAccount />
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

export default SignUp;