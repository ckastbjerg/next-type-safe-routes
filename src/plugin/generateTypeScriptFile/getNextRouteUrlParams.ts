const isCatchAllParam = (param: string) => param.match(/\.\.\./);
const getNextRouteUrlParams = (href: string) => {
  const paramStrings = href.match(/\[([^\]]+)\]/g);
  const params = paramStrings
    ?.filter((param) => !isCatchAllParam(param))
    .map((param) => param.replace("[", "").replace("]", ""));

  return !!params?.length ? params : undefined;
};

export default getNextRouteUrlParams;
