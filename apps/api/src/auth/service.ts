import { hashPassword } from './password.js'
import { EmailAlreadyInUseError } from './errors.js'
import {
  createUser,
  findUserByEmail,
} from '../repositories/user.js'

interface CreateAccountInput {
  name: string
  email: string
  password: string
}

export async function createAccount(input: CreateAccountInput) {
  const existingUser = await findUserByEmail(input.email)

  if (existingUser) {
    throw new EmailAlreadyInUseError()
  }

  const passwordHash = await hashPassword(input.password)

  return createUser({
    name: input.name,
    email: input.email,
    passwordHash,
    createdAt: new Date(),
  })
}
