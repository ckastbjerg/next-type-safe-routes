import { Link } from "components";
import { useApiRoute } from "hooks";

const UsersPage = () => {
  const [users] = useApiRoute("/api/users");

  if (!users) {
    return "Loading...";
  }

  return (
    <>
      {users.map(({ userId, name }) => (
        <Link to={{ route: "/users/[userId]", params: { userId } }}>
          {name}
        </Link>
      ))}
    </>
  );
};

export default UsersPage;
