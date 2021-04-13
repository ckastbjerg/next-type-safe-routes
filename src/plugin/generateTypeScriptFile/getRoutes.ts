import getNextPageRoute from "./getNextPageRoute";
import getNextRouteUrlParams from "./getNextRouteUrlParams";
import { Page } from "./types";
import { getIsCatchAllRoute, getIsOptionalCatchAllRoute } from "./utils";

const getRoutes = (fileNames: string[]): Page[] => {
  return fileNames.map((fileName) => {
    return {
      route: getNextPageRoute(fileName),
      params: getNextRouteUrlParams(fileName),
      isCatchAllRoute: getIsCatchAllRoute(fileName),
      isOptionalCatchAllRoute: getIsOptionalCatchAllRoute(fileName),
    };
  });
};

export default getRoutes;
