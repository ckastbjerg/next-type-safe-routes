export const getIsCatchAllRoute = (route: string) => !!route.match(/\[\.\.\./);
export const getIsOptionalCatchAllRoute = (route: string) =>
  !!route.match(/\[\[\.\.\./);
