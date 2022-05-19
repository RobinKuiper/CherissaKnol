import { getSession } from "next-auth/react";
import { urlHelpers } from "../../helpers";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    case 'POST':
      return addCategory(req, res);
      break;

    case 'PUT':
      return updateCategory(req, res);
      break;

    case 'DELETE':
      return deleteCategory(req, res);
      break;
  }
}

async function addCategory(req, res) {
  const category = req.body;

  category.slug = urlHelpers.slugify(category.name);

  const newCategory = await prisma.category.create({
    data: {
      ...category,
    },
  });

  return res.status(200).send(newCategory);
}

async function updateCategory(req, res) {
  const { id, ...category } = req.body;

  category.slug = urlHelpers.slugify(category.name);

  await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: category,
  })

  return res.status(200).send({ success: true });
}

async function deleteCategory(req, res) {
  const { id } = req.body;

  await prisma.category.delete({
    where: {
      id: Number(id),
    },
  })

  return res.status(200).send({ success: true });
}