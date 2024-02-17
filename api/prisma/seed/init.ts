import { prisma } from '../../src/lib/prisma'

async function main() {
  await prisma.transaction.deleteMany({
    where: {
      clientId: {
        in: [1, 2, 3, 4, 5, 6],
      },
    },
  })

  await prisma.client.deleteMany({
    where: {
      id: {
        notIn: [1, 2, 3, 4, 5, 6],
      },
    },
  })

  await prisma.client.upsert({
    where: { id: 1 },
    update: {
      balance: 0,
      limit: 100000,
    },
    create: {
      id: 1,
      balance: 0,
      limit: 100000,
    },
  })

  await prisma.client.upsert({
    where: { id: 2 },
    update: {
      balance: 0,
      limit: 80000,
    },
    create: {
      id: 2,
      balance: 0,
      limit: 80000,
    },
  })

  await prisma.client.upsert({
    where: { id: 3 },
    update: {
      balance: 0,
      limit: 1000000,
    },
    create: {
      id: 3,
      balance: 0,
      limit: 1000000,
    },
  })

  await prisma.client.upsert({
    where: { id: 4 },
    update: {
      balance: 0,
      limit: 10000000,
    },
    create: {
      id: 4,
      balance: 0,
      limit: 10000000,
    },
  })

  await prisma.client.upsert({
    where: { id: 5 },
    update: {
      balance: 0,
      limit: 500000,
    },
    create: {
      id: 5,
      balance: 0,
      limit: 500000,
    },
  })
}

await main()
