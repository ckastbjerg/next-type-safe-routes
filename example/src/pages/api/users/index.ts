import { NextApiRequest, NextApiResponse } from "next";

import { users } from "../mocks";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(users);
}
