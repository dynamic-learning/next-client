import ThemeContext from "../../contexts";
import { useContext } from "react";
import { useRouter } from "next/router";
import { signup } from "../../api/mutations";
import { getCommonStyle } from "../login/getCommonStyle";

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

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

    if (email.length === 0 || password.length === 0) {
      alert("Email or password cannot be empty");
      return;
    }

    //TODO: Modify mutation to add username also
    signup(email, password)
      .then((data) => {
        if (data.createUser._id) {
          console.log("User ID", data.createUser._id);
          alert("User creation successful. Please login to continue!");
        }
      })
      .catch((err) => {
        console.log(err);
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
