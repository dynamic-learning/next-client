export const getCommonStyle = ({ color1, color7, color5 }: any) => `
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
      border: 1px solid lightgrey;
      padding: 0.3rem;
      outline:none;
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
      margin:10px auto;
      width:70px;
      background-color:${color1};
      cursor:pointer;
      border:none;
      border-radius:0.8rem;
      padding: 0.15rem;
      outline:0;
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
`;
