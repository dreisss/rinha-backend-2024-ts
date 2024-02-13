import fastify from 'fastify'

import { createTransaction } from './routes/create-transaction'
import { getStatement } from './routes/get-statement'

const app = fastify()

app.register(createTransaction)
app.register(getStatement)

app.listen({ port: 3333 }, () => {
  console.log('HTTP server running!')
})
