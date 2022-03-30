import walkSync from "walk-sync";

import getFileContent from "./getFileContent";
import getRoutes from "./getRoutes";

const ignorePagesRoutes = ["_app.tsx", "_document.tsx"];
const shouldIncludePageEntry = (route: string) =>
  route.match(".tsx") && !ignorePagesRoutes.includes(route);
const shouldIncludeApiRouteEntry = (endpoint: string) => endpoint.match(".ts");

const getApiRouteFiles = (pagesDir: string) => {
  try {
    return walkSync(`${pagesDir}/api`, {
      directories: false,
    });
  } catch (err) {
    // api routes are not required
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
};

const generateTypeScriptFile = (pagesDir: string) => {
  const pagesFiles = walkSync(pagesDir, {
    directories: false,
    ignore: ["api"],
  });
  const apiRouteFiles = getApiRouteFiles(pagesDir);
  const relevantPages = pagesFiles.filter(shouldIncludePageEntry);
  const pages = getRoutes(relevantPages.map((page) => `/${page}`));
  const relavantApiRoutes = apiRouteFiles.filter(shouldIncludeApiRouteEntry);
  const apiRoutes = getRoutes(
    relavantApiRoutes.map((route) => `/api/${route}`)
  );

  const fileContent = getFileContent({ pages, apiRoutes });

  return fileContent;
};

export default generateTypeScriptFile;
