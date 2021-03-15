const getNextPageRoute = (fileName: string) => {
  // if this is the root index file, return "/"" instead of ""
  if (fileName === "") {
    return "/";
  }

  return (
    fileName
      // remove the file extension
      .split(".")[0]
      // index pages don't need the "/index" when used as hrefs
      .replace("/index", "")
  );
};

export default getNextPageRoute;
