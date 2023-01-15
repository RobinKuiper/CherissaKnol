import shell from 'shelljs';

import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) res.status(401).send({ error: "Not authorized" });

  shell.exec('pnpm start:full');
}