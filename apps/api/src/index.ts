import { buildApp } from './app.js'
import { connectDatabase } from './db/client.js'

async function start() {
  await connectDatabase()

  const app = buildApp()

  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
