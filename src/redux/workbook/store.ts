import { createStore } from "redux";
import workbookReducer from "./reducer";

const store = createStore(workbookReducer);

export default store;
