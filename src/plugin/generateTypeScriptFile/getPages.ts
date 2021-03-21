import getNextPageRoute from "./getNextPageRoute";
import getNextRouteUrlParams from "./getNextRouteUrlParams";
import { Page } from "./types";

const ignoreRoutes = ["/_app.tsx", "/_document.tsx"];

const shouldIncludeEntry = (route: string) =>
  route.match(".tsx") && !ignoreRoutes.includes(route);

const getPages = (fileNames: string[]): Page[] => {
  return fileNames.filter(shouldIncludeEntry).map((fileName) => {
    const route = getNextPageRoute(fileName);
    const params = getNextRouteUrlParams(route);
    return { route, params };
  });
};

export default getPages;
