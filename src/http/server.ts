import fastify from 'fastify'

import { newClient } from './routes/new-client'
import { createTransaction } from './routes/create-transaction'
import { getStatement } from './routes/get-statement'

const app = fastify()

app.register(newClient)
app.register(createTransaction)
app.register(getStatement)

app.listen({ port: 3333 }, () => {
  console.log('HTTP server running!')
})
