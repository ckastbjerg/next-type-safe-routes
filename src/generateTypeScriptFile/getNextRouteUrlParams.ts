const getNextRouteUrlParams = (href: string) => {
  const params = href.match(/\[([^\]]+)\]/g);
  return params?.map((param) => param.replace("[", "").replace("]", ""));
};

export default getNextRouteUrlParams;
