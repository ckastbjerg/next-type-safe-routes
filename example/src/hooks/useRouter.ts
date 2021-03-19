import { TypeSafePage, getAsPath } from "next-type-safe-pages";
import { useRouter as useNextRouter } from "next/router";

const useRouter = () => {
  const router = useNextRouter();

  const push = (typeSafeUrl: TypeSafePage) => {
    router.push(getAsPath(typeSafeUrl));
  };

  return { ...router, push };
};

export default useRouter;
