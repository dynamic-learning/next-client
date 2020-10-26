import showdown from "showdown";

const converter = new showdown.Converter();

const Description = ({ description }: any) => {
  return (
    <>
      <style>{style}</style>
      <div className="description">
        
        <div 
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }}
        />
      </div>
    </>
  );
};

const style = `
    .description {
        padding:3rem;
        width:70vw;
        color:#495057;
        font-size:14px
    }
    @media screen and (max-width: 50em) {
      .description{
        font-size:10px
        padding:2rem;
        width:100vw;
      }
`;

export default Description;
