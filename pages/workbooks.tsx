import dynamic from "next/dynamic";
import * as mutations from "../src/api/mutations";
import * as queries from "../src/api/queries";
import { useEffect, useState } from "react";
import { Spin } from "antd";

// To get rid of window error
const WorkbooksWithNoSSR = dynamic(
  () => import("../src/components/files-and-folders/workbooks"),
  { ssr: false }
);

const WorkbooksPage = () => {
  const [workbooks, setWorkbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queries.getWorkbooks().then((res) => {
      setWorkbooks(res.workbookViewer);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="page-container">
        <Spin spinning={loading} size="large">
          <WorkbooksWithNoSSR
            setSpinner={setLoading}
            initialWorkbooks={workbooks}
            addWorkbook={mutations.createWorkbook}
            addWorkbookFolder={mutations.createWorkbookFolder}
            deleteWorkbook={mutations.deleteWorkbook}
            deleteWorkbookFolder={mutations.deleteWorkbookFolder}
            updateWorkbook={mutations.updateWorkbook}
            updateWorkbookFolder={mutations.updateWorkbookFolder}
          />
        </Spin>
      </div>
    </>
  );
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
