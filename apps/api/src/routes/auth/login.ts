import type { FastifyInstance } from 'fastify'
import { login } from '../../auth/service.js'
import { InvalidCredentialsError } from '../../auth/errors.js'

export async function loginRoutes(app: FastifyInstance) {
  app.post('/auth/login', async (request, reply) => {
    const body = request.body as {
      email: string
      password: string
    }

    try {
      const user = await login(body)

      return reply.code(200).send({
        userId: user._id,
        name: user.name,
        email: user.email,
      })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.code(401).send({
          error: 'Invalid email or password',
        })
      }

      throw error
    }
  })
}
