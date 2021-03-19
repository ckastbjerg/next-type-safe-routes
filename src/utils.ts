// NOTE, these will be replaced with the "real" TypeSafePage type
// when generating types for a project
type TypeSafePage = string | { path: string };
type TypeSafeApiRoute = string | { endpoint: string };

export const getPathname = (typeSafeUrl: TypeSafePage | TypeSafeApiRoute) => {
  if (typeof typeSafeUrl === "string") {
    return typeSafeUrl;
  } else if ("path" in typeSafeUrl) {
    return typeSafeUrl.path;
  }

  return typeSafeUrl.endpoint;
};

const getSearchParams = (query: any) => {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams(query as any).toString();
  return `?${params}`;
};

export const getApiRoute = (typeSafeUrl: TypeSafeApiRoute, query?: any) => {
  if (typeof typeSafeUrl === "string") {
    return typeSafeUrl;
  }
  const searchParams = getSearchParams(query);
  const { endpoint, ...params } = typeSafeUrl;
  let route = endpoint as string;
  Object.keys(params).forEach((param) => {
    route = route.replace(`[${param}]`, (params as any)[param]);
  });
  return `${route}${searchParams}`;
};

export const getAsPath = (
  typeSafeUrl: TypeSafePage | TypeSafeApiRoute,
  query?: any
) => {
  if (typeof typeSafeUrl === "string") {
    return typeSafeUrl;
  } else if ("endpoint" in typeSafeUrl) {
    return getApiRoute(typeSafeUrl, query);
  }

  const searchParams = getSearchParams(query);
  const { path, ...params } = typeSafeUrl;
  let href = path as string;
  Object.keys(params).forEach((param) => {
    href = href.replace(`[${param}]`, (params as any)[param]);
  });

  return `${href}${searchParams}`;
};
