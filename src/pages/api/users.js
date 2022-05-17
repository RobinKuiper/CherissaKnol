import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";


export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    case 'POST':
      return add(req, res);
      break;

    case 'PUT':
      return update(req, res);
      break;

    case 'DELETE':
      return remove(req, res);
      break;
  }
}

async function add(req, res) {
  const user = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  const result = await prisma.user.create({
    data: {
      ...user,
    },
  });

  return res.status(200).send({ success: true });
}

async function update(req, res) {
  const { id, ...user } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: user,
  })

  return res.status(200).send({ success: true });
}

async function remove(req, res) {
  const { id } = req.body;

  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  })

  return res.status(200).send({ success: true });
}