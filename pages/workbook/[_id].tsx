import Workbook from "../../src/components/workbook";
import { Provider } from "react-redux";
import store from "../../src/redux/stores";
import { getWorkbook } from "../../src/api/queries";
import { SlideType } from "../../src/types";
import { updateWorkbook } from "../../src/api/mutations";

const WorkbookPage = ({ workbook }: any) => {
  if (!workbook) {
    return <p>Workbook not found</p>;
  }

  const slides: Array<SlideType> = JSON.parse(workbook.slides);
  const _id = workbook._id;
  const props = { initialSlides: slides, _id, updateWorkbook };
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <Workbook {...props} />
    </Provider>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const _id = context.query._id;
    const res = await getWorkbook(_id);
    return {
      props: {
        workbook: res.workbook,
      },
    };
  } catch (err) {
    return {
      props: {
        workbook: null,
      },
    };
  }
};

export default WorkbookPage;
