import getNextPageRoute from "./getNextPageRoute";
import getNextRouteUrlParams from "./getNextRouteUrlParams";
import { Page } from "./types";

const shouldIncludeEntry = (route: string) =>
  !route.startsWith("/_") && !route.match(".md");

const getPages = (fileNames: string[]): Page[] => {
  return fileNames.filter(shouldIncludeEntry).map((fileName) => {
    const route = getNextPageRoute(fileName);
    const params = getNextRouteUrlParams(route);
    return { route, params };
  });
};

export default getPages;
