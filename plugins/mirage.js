import { createServer, Model } from 'miragejs'

export default defineNuxtPlugin(() => {
  createServer({
    models: {
      user: Model,
    },
    seeds(server) {
      server.create('user', { id: 1, name: 'Fernanda', email: 'fernanda@email.com', password: '1234' })
    },
    routes() {
      this.namespace = 'api'

      this.get('/users', (schema) => schema.all('user'))
      this.post('/users', (schema, request) =>
        schema.create('user', JSON.parse(request.requestBody)),
      )
      this.put('/users/:id', (schema, request) => {
        const data = JSON.parse(request.requestBody)
        return schema.find('user', request.params.id)?.update(data)
      })
      this.delete('/users/:id', (schema, request) =>
        schema.find('user', request.params.id)?.destroy(),
      )
    },
  })
})
