import fastify from 'fastify'

import { createTransaction } from './routes/create-transaction'

const app = fastify()

app.register(createTransaction)

app.listen({ port: 3333 }, () => {
  console.log('HTTP server running!')
})
