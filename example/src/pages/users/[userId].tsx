import { Link } from "components";
import { useApiRoute, useRouter } from "hooks";

import { getRoute } from "next-type-safe-routes";

getRoute({route: "/users/[userId]", userId: 1})




const UserPage = () => {
  const { query } = useRouter();
  const userId = query.userId as string;
  const [user] = useApiRoute({ route: "/api/users/[userId]", userId });

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
