const LogoWithCaption = () => (
  <>
    <style>{style}</style>
    <div className="logo-container">
      <div className="logo-inner-container">
        <img className="logo-with-caption" src="logo-with-caption.svg" />
      </div>
      <div className="caption">
        A platform where teachers and programmers collaborate to create STEM lessons taught with the help of interactive visualizations.
      </div>
    </div>
  </>
);

const style = `
    .logo-with-caption {
        width:200px;
        height:200px;
        position:relative;
        transform:translateY(25vh);
        margin-top:10%;
    }
    .logo-container {
        width:100vw;
        margin:auto;
        position:relative;
        right: 20px;
        bottom:15vh;
    }
    .logo-inner-container {
        width:200px;
        margin:auto;       
    }
    .caption {
        width:50%;
        text-align:center;
        transform:translate(52%,28vh);
        font-size:18px;
        padding-left:2px;
    }
    @media screen and (max-width: 45em) {
      .logo-with-caption {
        transform:translateY(22vh);
      }
      .caption{
        font-size:15px;
        transform:translate(50%,25vh);
      }
`;

export default LogoWithCaption;
