import getNextPageRoute from "./getNextPageRoute";
import getNextRouteUrlParams from "./getNextRouteUrlParams";
import { ApiRoute } from "./types";

const shouldIncludeEntry = (endpoint: string) => !endpoint.match("README");

const getApiRoutes = (fileNames: string[]): ApiRoute[] => {
  return fileNames.filter(shouldIncludeEntry).map((fileName) => {
    const route = getNextPageRoute(fileName);
    const params = getNextRouteUrlParams(route);
    return { route, params };
  });
};

export default getApiRoutes;
