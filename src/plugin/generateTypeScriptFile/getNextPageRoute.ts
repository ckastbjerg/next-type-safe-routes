import { getIsCatchAllRoute, getIsOptionalCatchAllRoute } from "./utils";

const getNextPageRoute = (fileName: string): string => {
  // casts safe since we guard with the conditionals
  if (getIsOptionalCatchAllRoute(fileName)) {
    return fileName.split("/[[...")[0] as string;
  } else if (getIsCatchAllRoute(fileName)) {
    return fileName.split("/[...")[0] as string;
  }

  const route = fileName
    // remove the file extension
    .replace(/\.[^.]+$/, "")
    // index pages don't need the "/index" when used as hrefs
    .replace("/index", "");

  // if this is the root index file, return "/"" instead of ""
  return route === "" ? "/" : route;
};

export default getNextPageRoute;
