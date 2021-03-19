const getNextPageRoute = (fileName: string) => {
  const route = fileName
    // remove the file extension
    .split(".")[0]
    // index pages don't need the "/index" when used as hrefs
    .replace("/index", "");

  // if this is the root index file, return "/"" instead of ""
  return route === "" ? "/" : route;
};

export default getNextPageRoute;
