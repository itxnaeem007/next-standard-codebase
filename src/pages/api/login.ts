import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "./user";

const octokit = new Octokit();

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;
  try {
    const {
      data: { login, avatar_url },
    } = await octokit.rest.users.getByUsername({ username });
    const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
