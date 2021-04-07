import { Link } from "components";
import { useApiRoute, useRouter } from "hooks";

const UserPage = () => {
  const { query } = useRouter();
  const userId = query.userId as string;
  const [user] = useApiRoute({
    route: "/api/users/[userId]",
    params: { userId },
    query: { test: 2 },
  });

  if (!user) {
    return "Loading...";
  }

  return (
    <>
      <p>{user.name}</p>
      <Link to="/users">Back to users</Link>
    </>
  );
};

export default UserPage;
