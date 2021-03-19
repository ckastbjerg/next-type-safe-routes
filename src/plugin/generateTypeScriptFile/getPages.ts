import getNextPageRoute from "./getNextPageRoute";
import getNextRouteUrlParams from "./getNextRouteUrlParams";
import { Page } from "./types";

const shouldIncludeEntry = (path: string) =>
  !path.startsWith("/_") && !path.match(".md");

const getPages = (routes: string[]): Page[] => {
  return routes.filter(shouldIncludeEntry).map((route) => {
    const path = getNextPageRoute(route);
    const params = getNextRouteUrlParams(path);
    return { path, params };
  });
};

export default getPages;
