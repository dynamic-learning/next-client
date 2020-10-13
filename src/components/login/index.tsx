import ThemeContext from "../../contexts";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginWithGithub, loginWithGoogle } from "../../api/mutations";
import { login } from "../../api/queries";
import { getCommonStyle } from "./getCommonStyle";
import useAuth from "../../hooks/useAuth";
import { Spin } from "antd";
import SocialButton from "./SocialButton";
import config from "../../../config";

const { githubAppId, googleAppId, appRootUrl } = config;

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setAuthData } = useAuth();

  // Normal login
  const handleLogin = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length === 0 || password.length === 0) {
      alert("Email or password cannot be empty");
      return;
    }

    setLoading(true);

    login(email, password)
      .then((data) => {
        postLogin(data.login);
      })
      .catch((err) => {
        handleAPIError(err);
      });
  };

  // On github redirect login
  useEffect(() => {
    const code = router.asPath.match("code=(.*)&state=");
    if (code) {
      setLoading(true);
      loginWithGithub(code[1])
        .then((data) => {
          postLogin(data.loginWithGithub);
        })
        .catch((err) => {
          handleAPIError(err);
        });
    }
  }, []);

  // On google login
  const handleGoogleLoginSuccess = async (res: any) => {
    setLoading(true);
    loginWithGoogle(res._token.idToken)
      .then((data) => {
        postLogin(data.loginWithGoogle);
      })
      .catch((err) => {
        handleAPIError(err);
      });
  };

  // Handle login auth token response
  const postLogin = async (authData: any) => {
    setAuthData(authData);
    router.back();
  };

  const handleAPIError = (err: any) => {
    setLoading(false);
    alert(err.response.errors[0].message);
  };

  const handleLoginFailure = (err: any) => {
    console.log(err);
  };

  const GithubAndGoogleIcons = () => (
    <>
      <div className="OR">OR</div>
      <div className="oauth-icons-container">
        <SocialButton
          provider="google"
          appId={googleAppId}
          onLoginSuccess={handleGoogleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        >
          <img className="google bright-on-hover" src="google.png" />
        </SocialButton>
        <SocialButton
          provider="github"
          appId={githubAppId}
          gatekeeper={appRootUrl}
          redirect={`${appRootUrl}/login`}
        >
          <img className="github bright-on-hover" src="github.png" />
        </SocialButton>
      </div>
    </>
  );

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

  const goToSignUp = () => router.push("/signup");

  const Logo = () => (
    <div className="logo-container">
      <img className="logo" src="/logo.png" />
    </div>
  );

  return (
    <>
      <style>{getStyle(theme)}</style>
      <Spin spinning={loading} size="large">
        <div className="page-container">
          <div className="box">
            <Logo />
            <LoginForm />
            <GithubAndGoogleIcons />
            <CreateNewAccount />
          </div>
        </div>
      </Spin>
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
      margin-left:1rem;
      cursor:pointer;
    }
    .google.bright-on-hover {
      width:65px;
      height:67px;
      cursor:pointer;
      margin-right:1rem;
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
