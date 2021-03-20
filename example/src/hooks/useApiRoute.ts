import useSWR from "swr";
import { getRoute, TypeSafeApiRoute } from "next-type-safe-routes";

// @ts-ignore fetch(...args) expects 1-2 arguments, but this is from swr docs
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useApiRoute = (typeSafeRoute: TypeSafeApiRoute) => {
  const route = getRoute(typeSafeRoute);
  const { data, error } = useSWR(route, fetcher);
  return [data, { error }] as const;
};

export default useApiRoute;
