import { CanvasSimType } from "../../../../types";

interface Props {
  sim: CanvasSimType;
  isTransforming: boolean;
}

const Sim = (props: Props) => {
  const {
    sim: { size, owner, id },
    isTransforming,
  } = props;
  return (
    <>
      <style>{getStyle(isTransforming)}</style>
      <iframe
        className="iframe"
        scrolling="no"
        width={size.width}
        height={size.height}
        src={`https://editor.p5js.org/${owner}/embed/${id}`}
      />
    </>
  );
};

const getStyle = (isTransforming: boolean) => `
    .iframe {
        border:1px solid grey;
        pointer-events:${isTransforming ? "none" : ""};
    }
`;

export default Sim;
