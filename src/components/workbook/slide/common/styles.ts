export const rightMenuCommonStyles = `
.right-menu {
    color:black;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .right-menu:hover {
    color:grey;
  }
  .right-top-menu {
    display:flex;
    flex-direction:column;
    margin-left:0.5rem;
  }
  .icon {
    font-size:1.2rem;
    margin-bottom:0.3rem; 
    cursor:pointer;
  }
  .icon:hover {
    color:white;
  }
  .resize-handle svg {
    position:fixed;
    right:0;
    bottom:0;
  }
`;
