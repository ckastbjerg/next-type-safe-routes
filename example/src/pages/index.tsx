import { useRouter } from "hooks";

const Home = () => {
  const { push } = useRouter();
  return <button onClick={() => push("/users")}>Show users</button>;
};

export default Home;
