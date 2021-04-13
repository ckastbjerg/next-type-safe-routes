import { useRouter } from "hooks";

const OptionalCatchAll = () => {
  const router = useRouter();
  const slug = router.query.slug;
  return <div>{slug ? (slug as string[]).join(",") : "no slug"}</div>;
};

export default OptionalCatchAll;
