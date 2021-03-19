import walkSync from "walk-sync";

import getApiRoutes from "./getApiRoutes";
import getFileContent from "./getFileContent";
import getPages from "./getPages";

const generateTypeScriptFile = (pagesDir: string) => {
  const pagesFiles = walkSync(pagesDir, {
    directories: false,
    ignore: ["api"],
  });
  const apiRouteFiles = walkSync(`${pagesDir}/api`, {
    directories: false,
  });

  const pages = getPages(pagesFiles.map((page) => `/${page}`));
  const apiRoutes = getApiRoutes(apiRouteFiles.map((page) => `/api/${page}`));
  const fileContent = getFileContent({ pages, apiRoutes });

  return fileContent;
};

export default generateTypeScriptFile;
