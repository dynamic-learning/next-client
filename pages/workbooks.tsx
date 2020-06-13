import dynamic from "next/dynamic";

// To get rid of window error
const WorkbooksWithNoSSR = dynamic(
  () => import("../src/components/files-and-folders/workbooks"),
  { ssr: false }
);

const WorkbooksPage = () => (
  <>
    <style>{style}</style>
    <div className="page-container">
      <WorkbooksWithNoSSR />
    </div>
  </>
);

const style = `
  .page-container {
    max-height: 100vh;
    overflow: hidden;
    background-color:#f3f3f3;
  }
`;
export default WorkbooksPage;
