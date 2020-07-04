import dynamic from "next/dynamic";
import * as mutations from "../src/api/mutations";
import * as queries from "../src/api/queries";

// To get rid of window error
const WorkbooksWithNoSSR = dynamic(
  () => import("../src/components/files-and-folders/workbooks"),
  { ssr: false }
);

const WorkbooksPage = ({ workbooks }: any) => {
  return (
    <>
      <style>{style}</style>
      <div className="page-container">
        <WorkbooksWithNoSSR
          initialWorkbooks={workbooks}
          addWorkbook={mutations.createWorkbook}
          addWorkbookFolder={mutations.createWorkbookFolder}
          deleteWorkbook={mutations.deleteWorkbook}
          deleteWorkbookFolder={mutations.deleteWorkbookFolder}
          updateWorkbook={mutations.updateWorkbook}
          updateWorkbookFolder={mutations.updateWorkbookFolder}
        />
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await queries.getWorkbooks();
  return { props: { workbooks: res.workbookViewer } };
};

//////////////////////////////////////////
//////// Api calls //////////////////////
////////////////////////////////////////

/**
 * 1. To add a new file
 * 2. To add a new folder
 * 3. To update a file
 * 4. To update a folder
 * 5. To remove a file
 * 6. To remove a folder
 * 7. To get a list of all files and folders (Called initially)
 */

const style = `
  .page-container {
    max-height: 100vh;
    overflow: hidden;
    background-color:#f3f3f3;
  }
`;
export default WorkbooksPage;
