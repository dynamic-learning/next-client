import Workbook from "../src/components/workbook";
import { Provider } from "react-redux";
import store from "../src/redux/stores";
import { getTitleAndCreateNewWorkbook } from "../src/components/workbook/helpers";
import { SlideType } from "../src/types";
import { useRouter } from "next/router";

const WorkbookPage = () => {
  const router = useRouter();

  const saveWorkbook = async (slides: Array<SlideType>) => {
    const _id = await getTitleAndCreateNewWorkbook(slides);
    router.push(`workbook/${_id}`);
  };

  const props = {
    updateWorkbook: saveWorkbook,
  };

  return (
    <Provider store={store}>
      {/*@ts-ignore*/}
      <Workbook {...props} />
    </Provider>
  );
};

export default WorkbookPage;
