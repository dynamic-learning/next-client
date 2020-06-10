import { Divider } from "antd";

interface Props {
  selectedSim: any;
}

const SimDetails = (props: Props) => {
  const { selectedSim } = props;
  const Title = () => <div className="title">{selectedSim.title}}</div>;
  const Description = () => <div>{selectedSim.description}}</div>;

  return (
    <>
      <style>{style}</style>
      <div className="sim-detail">
        <Title />
        <Divider />
        <Description />
      </div>
    </>
  );
};

const style = `
  .title {
      font-weight:bold;
  }
  .sim-detail {
    margin-top:1rem;
    padding:0.5rem;
  }
`;

export default SimDetails;
