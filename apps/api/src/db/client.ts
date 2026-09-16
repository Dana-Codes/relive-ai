import { MongoClient } from 'mongodb'

const uri = 'mongodb://127.0.0.1:27017'

export const client = new MongoClient(uri)

export async function connectDatabase() {
  await client.connect()
  console.log('MongoDB connected')
}
