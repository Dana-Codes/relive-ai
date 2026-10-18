import { ObjectId, type Collection } from 'mongodb'
import type { User } from '../models/user.js'
import { client } from '../db/client.js'

const database = client.db('relive')
const users: Collection<User> = database.collection<User>('users')

export async function findUserByEmail(email: string) {
  return users.findOne({ email })
}

export async function createUser(user: User) {
  return users.insertOne(user)
}


export async function findUserById(userId: string) {
  if (!ObjectId.isValid(userId)) {
    return null
  }

  return users.findOne({
    _id: new ObjectId(userId),
  })
}
