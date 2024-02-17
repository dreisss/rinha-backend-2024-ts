import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'

export async function getStatement(app: FastifyInstance) {
  app.get('/clientes/:clientId/extrato', async (request, reply) => {
    const createTransactionParams = z.object({
      clientId: z.coerce.number(),
    })

    const { clientId } = createTransactionParams.parse(request.params)

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) return reply.status(404).send()

    const { balance, limit } = client

    const transactions = await prisma.transaction.findMany({
      where: {
        clientId,
      },
      select: {
        value: true,
        type: true,
        description: true,
        date: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: 10,
    })

    return reply.send({
      saldo: {
        total: balance,
        limite: limit,
        // biome-ignore lint/style/useNamingConvention: rinha backend rule
        data_extrato: new Date().toISOString(),
      },
      // biome-ignore lint/style/useNamingConvention: rinha backend rule
      ultimas_transacoes: transactions.map((transaction) => ({
        valor: transaction.value,
        tipo: transaction.type,
        descricao: transaction.description,
        // biome-ignore lint/style/useNamingConvention: rinha backend rule
        realizada_em: transaction.date.toISOString(),
      })),
    })
  })
}
