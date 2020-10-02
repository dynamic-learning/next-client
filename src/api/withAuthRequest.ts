import { GraphQLClient } from "graphql-request";
import config from "../../config";
import Cookies from "universal-cookie";

const { apiRootUrl } = config;

const request = (query: string) => {
  const cookies = new Cookies();
  const authData = cookies.get("auth_data");
  const isAuthorized = !!authData;

  const endpoint = apiRootUrl;
  let graphQLClient;

  if (isAuthorized) {
    const token = authData.token;
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: token,
      },
    });
  } else {
    graphQLClient = new GraphQLClient(endpoint);
  }

  return graphQLClient.request(query);
};

export default request;
