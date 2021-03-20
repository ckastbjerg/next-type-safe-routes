import { TypeSafePage, getRoute } from "next-type-safe-routes";
import { useRouter as useNextRouter } from "next/router";

const useRouter = () => {
  const router = useNextRouter();

  const push = (typeSafeUrl: TypeSafePage) => {
    router.push(getRoute(typeSafeUrl));
  };

  return { ...router, push };
};

export default useRouter;
