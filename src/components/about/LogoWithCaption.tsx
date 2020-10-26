const LogoWithCaption = () => (
  <>
    <style>{style}</style>
    <div className="logo-container">
      <div className="logo-inner-container">
        <img className="logo-with-caption" src="logo-with-caption.jpg" />
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
        transform:translateY(70%);
        margin-top:10%;
    }
    .logo-container {
        width:100vw;
        margin:auto;
        position:relative;
        right: 20px;
        bottom:15vh;
        background-image: linear-gradient(315deg, #3bb78f 0%, #2f9e44 74%);
    }
    .logo-inner-container {
        width:200px;
        margin:auto;       
    }
    .caption {
        width:50%;
        text-align:center;
        transform:translate(50%,30vh);
        font-size:20px;
    }

    
    @media screen and (max-width: 50em) {
      .caption{
        font-size:15px;
      }
`;

export default LogoWithCaption;
