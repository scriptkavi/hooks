import { NextApiRequest, NextApiResponse } from "next"

import hooks from "./hooks.json"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  return res.status(200).json(hooks)
}
