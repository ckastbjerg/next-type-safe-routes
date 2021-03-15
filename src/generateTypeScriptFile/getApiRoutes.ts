import getNextPageRoute from "./getNextPageRoute";
import getNextRouteUrlParams from "./getNextRouteUrlParams";
import { ApiRoute } from "./types";

const shouldIncludeEntry = (endpoint: string) => !endpoint.match("README");

const getApiRoutes = (routes: string[]): ApiRoute[] => {
  return routes.filter(shouldIncludeEntry).map((route) => {
    const endpoint = getNextPageRoute(route);
    const params = getNextRouteUrlParams(endpoint);
    return { endpoint, params };
  });
};

export default getApiRoutes;
