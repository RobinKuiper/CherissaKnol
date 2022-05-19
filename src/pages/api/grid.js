import { getSession } from "next-auth/react";
import { urlHelpers } from "../../helpers";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) res.status(401).send({ error: "Not authorized" });

  console.log('req.method', req.method);

  switch (req.method) {
    // case "GET":
    //   getPhotos(req, res);
    //   break;

    case 'POST':
      return addOrUpdateGrid(req, res);
      break;

    case 'DELETE':
      return deleteGrid(req, res);
      break;
  }
}

async function addOrUpdateGrid(req, res) {
  const { categoryId, ...data } = req.body;

  data.nodes = JSON.stringify(data.nodes);

  const grid = await prisma.grid.upsert({
    where: {
      categoryId: Number(categoryId),
    },
    update: {
      ...data,
    },
    create: {
      ...data,
      categoryId: Number(categoryId),
    },
  });

  return res.status(200).send(grid);
}

async function deleteGrid(req, res) {
  // const { id } = req.body;

  // await prisma.photo.delete({
  //   where: {
  //     id: Number(id),
  //   },
  // })

  // return res.status(200).send({ success: true });
}