const LogoWithCaption = () => (
  <>
    <style>{style}</style>
    <div className="logo-container">
      <div className="logo-inner-container">
        <img className="logo-with-caption" src="logo-with-caption.png" />
      </div>
      <div className="caption">
        A platform where teachers and programmers collaborate to create STEM
        lessons taught with the help of interactive visualizations.
      </div>
    </div>
  </>
);

const style = `
    .logo-with-caption {
        width:200px;
        height:200px;
    }
    .logo-container {
        width:600px;
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
        width:100%;
        text-align:center;
    }
`;

export default LogoWithCaption;
