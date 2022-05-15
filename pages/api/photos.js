import { getSession } from "next-auth/react";
import adminPhotoRepo from "../../helpers/adminPhotoRepo";

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    case 'POST':
      addPhoto(req, res);
      break;

    case 'PUT':
      updatePhoto(req, res);
      break;

    case 'DELETE':
      deletePhoto(req, res);
      break;
  }
}

async function addPhoto(req, res) {
  const photo = req.body;
  const newPhoto = await adminPhotoRepo.add(photo);

  res.status(200).send({ success: true });
}

async function updatePhoto(req, res) {
  const photo = req.body;
  const updatedPhoto = await adminPhotoRepo.update(photo);

  res.status(200).send({ success: true });
}

async function deletePhoto(req, res) {
  const id = req.body.id;
  const deletedPhoto = await adminPhotoRepo.delete(id);

  res.status(200).send({ success: true });
}