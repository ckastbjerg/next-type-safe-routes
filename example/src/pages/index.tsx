import Link from "../components/Link";
import useRouter from "../hooks";

const Home = () => {
  const { push } = useRouter();

  return (
    <>
      <Link to={{ path: "/links/[linkId]", linkId: 1 }}>
        <a>Go to link number 1</a>
      </Link>
      <button onClick={() => push("/links")}>Go to routes</button>
    </>
  );
};

export default Home;
