import type { FastifyInstance } from 'fastify'
import { healthRoutes } from './health.js'
import { signupRoutes } from './auth/signup.js'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoutes)
  await app.register(signupRoutes)
}
