import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'

export async function createTransaction(app: FastifyInstance) {
  app.post('/clientes/:clientId/transacoes', async (request, reply) => {
    const createTransactionParams = z.object({
      clientId: z.number(),
    })

    const createTransactionBody = z.object({
      valor: z.number().positive(),
      tipo: z.enum(['c', 'd']),
      descricao: z.string().min(1).max(10),
    })

    const { clientId } = createTransactionParams.parse(request.params)

    let body
    try {
      body = createTransactionBody.parse(request.body)
    } catch {
      return reply.status(400).send()
    }
    const { valor: value, tipo: type, descricao: description } = body

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) {
      return reply.status(404).send()
    }

    const { balance, limit } = client

    if (type === 'd' && balance - value < limit) {
      return reply.status(422).send()
    }

    await prisma.transaction.create({
      data: {
        value,
        type,
        description,
        clientId,
      },
    })

    await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        balance: balance - value,
      },
    })

    return reply.send({
      limite: limit,
      saldo: balance,
    })
  })
}
