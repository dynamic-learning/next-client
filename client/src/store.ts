import { createStore } from "redux";
import workbookReducer from "./reducers/workbook";

const store = createStore(workbookReducer as any);

export default store;
