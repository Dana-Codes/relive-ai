import type { Collection } from 'mongodb'
import type { User } from '../models/user.js'
import { client } from '../db/client.js'

const database = client.db('relive')
const users: Collection<User> = database.collection<User>('users')

export async function createUser(user: User) {
  return users.insertOne(user)
}
