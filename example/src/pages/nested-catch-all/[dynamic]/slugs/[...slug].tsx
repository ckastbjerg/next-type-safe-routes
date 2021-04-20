import { useRouter } from "hooks";

const CatchAll = () => {
  const router = useRouter();
  const { dynamic, slug } = router.query;
  return (
    <div>
      <div>dynamic: {dynamic}</div>
      <div>Slugs: {(slug as string[]).join(",")}</div>
    </div>
  );
};

export default CatchAll;
