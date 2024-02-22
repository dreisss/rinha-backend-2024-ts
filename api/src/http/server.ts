import { z } from 'zod'
import { env } from 'bun'
import fastify from 'fastify'

import { createTransaction } from './routes/create-transaction'
import { getStatement } from './routes/get-statement'

const envVariables = z.object({
  // biome-ignore lint/style/useNamingConvention: env variables
  HTTP_PORT: z.coerce.number().default(3000),
  // biome-ignore lint/style/useNamingConvention: env variables
  DATABASE_URL: z.string().url(),
})

const { HTTP_PORT } = envVariables.parse(env)

const app = fastify({
  logger: true,
})

app.register(createTransaction)
app.register(getStatement)

app.listen({ port: HTTP_PORT }, () => {
  console.log(`HTTP server running at port ${HTTP_PORT}.`)
})
