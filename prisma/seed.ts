import bcrypt from 'bcryptjs';
import prisma from '../src/lib/prisma';

async function main() {
  const salt = await bcrypt.genSalt(10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL,
      username: process.env.ADMIN_USERNAME,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, salt),
    },
  });

  await prisma.user.upsert({
    where: { email: process.env.CHERISSA_EMAIL },
    update: {},
    create: {
      email: process.env.CHERISSA_EMAIL,
      username: process.env.CHERISSA_USERNAME,
      password: await bcrypt.hash(process.env.CHERISSA_PASSWORD, salt),
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })