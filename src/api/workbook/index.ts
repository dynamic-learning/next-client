import { request } from "graphql-request";
import { getAllDetailsOfAllWorkbooks } from "./queries";
import config from "../../../config";

const { apiRootUrl } = config;

export const getWorkbooks = request(apiRootUrl, getAllDetailsOfAllWorkbooks);
