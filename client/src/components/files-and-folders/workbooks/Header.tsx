const Header = () => (
  <>
    <style>{style}</style>
    <div className="header-container">
      <img className="logo" src="logo.png" />
      <h1 className="header">My workbooks</h1>
    </div>
  </>
);

const style = `
  .logo {
    width:50px;
    height:50x;
    margin-bottom:0.5rem;
  }
  .header-container {
    display:flex;
    flex-direction:row;
  }
  .header {
    margin-left:0.5rem;
  }
`;

export default Header;
