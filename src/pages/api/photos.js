import { getSession } from "next-auth/react";
import { urlHelpers } from "../../helpers";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    // case "GET":
    //   getPhotos(req, res);
    //   break;

    case 'POST':
      return addPhoto(req, res);
      break;

    case 'PUT':
      return updatePhoto(req, res);
      break;

    case 'DELETE':
      return deletePhoto(req, res);
      break;
  }
}

async function addPhoto(req, res) {
  const photo = req.body;

  photo.slug = urlHelpers.slugify(photo.title);
  photo.price = Number(photo.price);
  photo.categoryId = Number(photo.categoryId);

  const newPhoto = await prisma.photo.create({
    data: {
      ...photo,
    },
  });

  return res.status(200).send(newPhoto);
}

async function updatePhoto(req, res) {
  const { id, ...photo } = req.body;

  await prisma.photo.update({
    where: {
      id: Number(id),
    },
    data: photo,
  })

  return res.status(200).send({ success: true });
}

async function deletePhoto(req, res) {
  const { id } = req.body;

  await prisma.photo.delete({
    where: {
      id: Number(id),
    },
  })

  return res.status(200).send({ success: true });
}