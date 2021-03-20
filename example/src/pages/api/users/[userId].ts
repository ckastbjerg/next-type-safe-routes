import { NextApiRequest, NextApiResponse } from "next";

import { users } from "../mocks";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  const user = users.find((user) => user.userId === userId);
  res.status(200).json(user);
}
