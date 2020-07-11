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
        padding:2rem;
        width:70vw;
    }
`;

export default Description;
