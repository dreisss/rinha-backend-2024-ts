import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'

export async function createTransaction(app: FastifyInstance) {
  app.post('/clientes/:clientId/transacoes', async (request, reply) => {
    const createTransactionParams = z.object({
      clientId: z.coerce.number(),
    })

    const createTransactionBody = z.object({
      valor: z.number().positive(),
      tipo: z.enum(['c', 'd']),
      descricao: z.string().min(1).max(10),
    })

    const { clientId } = createTransactionParams.parse(request.params)
    const {
      valor: value,
      tipo: type,
      descricao: description,
    } = createTransactionBody.parse(request.body)

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) return reply.status(404).send()

    const { balance, limit } = client
    let newBalance

    switch (type) {
      case 'c':
        newBalance = balance + value
        break
      case 'd':
        newBalance = balance - value

        if (balance + limit < value) return reply.status(422).send()
        break
    }

    await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        balance: newBalance,
        transactions: {
          create: {
            value,
            type,
            description,
          },
        },
      },
    })

    return reply.send({
      limite: limit,
      saldo: newBalance,
    })
  })
}
