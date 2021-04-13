import { useRouter } from "hooks";

const CatchAll = () => {
  const router = useRouter();
  const slug = router.query.slug as string[];
  return <div>Slugs: {slug.join(",")}</div>;
};

export default CatchAll;
