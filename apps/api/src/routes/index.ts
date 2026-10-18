
import type { FastifyInstance } from 'fastify'
import { healthRoutes } from './health.js'
import { signupRoutes } from './auth/signup.js'
import { loginRoutes } from './auth/login.js'
import { meRoutes } from './auth/me.js'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoutes)
  await app.register(signupRoutes)
  await app.register(loginRoutes)
  await app.register(meRoutes)
}
