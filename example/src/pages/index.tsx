import { Link } from "components";
import { useRouter } from "hooks";

const Home = () => {
  const { push } = useRouter();
  return (
    <>
      <button onClick={() => push("/users")}>Show users</button>
      <Link to="/optional-catch-all">Optional catch all (no path)</Link>
      <Link to={{ route: "/catch-all", path: "/a/b/c" }}>
        Optional catch all
      </Link>
      <Link to={{ route: "/optional-catch-all", path: "/a/b/c" }}>
        Catch all
      </Link>
      <Link
        to={{
          route: "/nested-catch-all/[dynamic]/slugs",
          params: { dynamic: 1 },
          path: "/a/b/c",
        }}
      >
        Nested catch all (with params)
      </Link>
    </>
  );
};

export default Home;
