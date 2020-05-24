import Workbook from "../src/components/workbook";
import { Provider } from "react-redux";
import store from "../src/store";

export default () => {
  return (
    <Provider store={store}>
      <Workbook />
    </Provider>
  );
};
