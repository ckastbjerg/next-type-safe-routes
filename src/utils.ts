// NOTE, these will be replaced with the "real" TypeSafePage type
// when generating types for a project
type Query = { [key: string]: any };
type TypeSafePage =
  | string
  | { route: string; path?: string; query?: Query }
  | { route: string; path?: string; params: any; query?: Query };
type TypeSafeApiRoute = TypeSafePage;

export const getPathname = (typeSafeUrl: TypeSafePage | TypeSafeApiRoute) => {
  if (typeof typeSafeUrl === "string") {
    return typeSafeUrl;
  } else {
    return typeSafeUrl.route;
  }
};

const getSearchParams = (query: any) => {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams(query as any).toString();
  return `?${params}`;
};

export const getRoute = (typeSafeUrl: TypeSafePage | TypeSafeApiRoute) => {
  if (typeof typeSafeUrl === "string") {
    return `${typeSafeUrl}`;
  }

  const searchParams = getSearchParams(typeSafeUrl.query);

  let route = typeSafeUrl.route as string;
  const params = "params" in typeSafeUrl ? typeSafeUrl.params : {};
  Object.keys(params).forEach((param) => {
    route = route.replace(`[${param}]`, (params as any)[param]);
  });
  const path = typeSafeUrl.path || "";

  return `${route}${path}${searchParams}`;
};
