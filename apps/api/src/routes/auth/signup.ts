import type { FastifyInstance } from 'fastify'
import { createAccount } from '../../auth/service.js'
import { EmailAlreadyInUseError } from '../../auth/errors.js'

export async function signupRoutes(app: FastifyInstance) {
  app.post('/auth/signup', async (request, reply) => {
    const body = request.body as {
      name: string
      email: string
      password: string
    }

    try {
      const result = await createAccount(body)

      return reply.code(201).send({
        userId: result.insertedId,
      })
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return reply.code(409).send({
          error: 'Email already in use',
        })
      }

      throw error
    }
  })
}
