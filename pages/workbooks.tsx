import dynamic from "next/dynamic";
import { getWorkbooks } from "../src/api/workbook/index";

// To get rid of window error
const WorkbooksWithNoSSR = dynamic(
  () => import("../src/components/files-and-folders/workbooks"),
  { ssr: false }
);

const WorkbooksPage = (props: any) => {
  const { workbooks } = props;

  return (
    <>
      <style>{style}</style>
      <div className="page-container">
        <WorkbooksWithNoSSR workbooks={workbooks} />
      </div>
    </>
  );
};

WorkbooksPage.getInitialProps = async () => {
  const res = await getWorkbooks;
  const { workbooks } = res;
  return { workbooks };
};

const style = `
  .page-container {
    max-height: 100vh;
    overflow: hidden;
    background-color:#f3f3f3;
  }
`;
export default WorkbooksPage;
