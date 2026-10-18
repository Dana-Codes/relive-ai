
import type { FastifyInstance } from 'fastify'
import { requireAuth } from '../../auth/require-auth.js'
import { getUserProfile } from '../../auth/service.js'

export async function meRoutes(app: FastifyInstance) {
  app.get(
    '/auth/me',
    { preHandler: requireAuth },
    async (request, reply) => {
      const userId = request.user.userId

      const user = await getUserProfile(userId)

      if (!user) {
        return reply.code(404).send({
          error: 'User not found',
        })
      }

      return reply.code(200).send(user)
    },
  )
}
