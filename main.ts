import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'bob5@prisma.io',
      role: {
        create: {
          name: 'ADMIN',
          tag: {
            create: {
              name: 'cs'
            }
          }
        }
      }
    }
  });

  const user = await prisma.user.update({
    where: {
      email: 'bob5@prisma.io',
    },
    data: {
      role: {
        update: {
          tag: {
            disconnect: true
          }
        }
      }
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
