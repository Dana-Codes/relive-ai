import type { FastifyReply, FastifyRequest } from 'fastify'
import { verifyAuthToken } from './token.js'

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorization = request.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    return reply.code(401).send({
      error: 'Authentication required',
    })
  }

  const token = authorization.slice('Bearer '.length)

  try {
    const payload = verifyAuthToken(token)

    request.user = {
      userId: payload.userId,
    }
  } catch {
    return reply.code(401).send({
      error: 'Invalid or expired token',
    })
  }
}