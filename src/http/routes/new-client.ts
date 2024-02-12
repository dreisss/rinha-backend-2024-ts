import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function newClient(app: FastifyInstance) {
  app.post('/clientes', async (request, reply) => {
    const newClientBody = z.object({
      limite: z.number(),
      saldo: z.number().default(0),
    })

    const { limite: limit, saldo: balance } = newClientBody.parse(request.body)

    const client = await prisma.client.create({
      data: {
        limit,
        balance,
      },
    })

    return reply.send({
      id: client.id,
    })
  })
}
