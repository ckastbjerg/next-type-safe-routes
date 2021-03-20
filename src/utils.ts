// NOTE, these will be replaced with the "real" TypeSafePage type
// when generating types for a project
type TypeSafePage = string | { route: string };
type TypeSafeApiRoute = string | { route: string };

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

export const getRoute = (
  typeSafeUrl: TypeSafePage | TypeSafeApiRoute,
  query?: any
) => {
  if (typeof typeSafeUrl === "string") {
    return typeSafeUrl;
  }

  const searchParams = getSearchParams(query);
  const { route, ...params } = typeSafeUrl;
  let href = route as string;
  Object.keys(params).forEach((param) => {
    href = href.replace(`[${param}]`, (params as any)[param]);
  });

  return `${href}${searchParams}`;
};
