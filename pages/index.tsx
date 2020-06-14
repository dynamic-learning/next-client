import Workbook from "../src/components/workbook";
import { Provider } from "react-redux";
import store from "../src/redux/workbook/store";

const WorkbookPage = () => {
  return (
    <Provider store={store}>
      <Workbook />
    </Provider>
  );
};

export default WorkbookPage;
