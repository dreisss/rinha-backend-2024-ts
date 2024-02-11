import fastify from 'fastify'

const app = fastify()

app.post('/clientes/:id/transacoes', (request, reply) => {
  return reply.send()
})

app.listen({ port: 3333 }, () => {
  console.log('HTTP server running!')
})
