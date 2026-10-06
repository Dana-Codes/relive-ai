import { hashPassword, verifyPassword } from './password.js'
import { createAuthToken } from './token.js'
import {
  EmailAlreadyInUseError,
  InvalidCredentialsError,
} from './errors.js'
import {
  createUser,
  findUserByEmail,
} from '../repositories/user.js'

interface CreateAccountInput {
  name: string
  email: string
  password: string
}

interface LoginInput {
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

export async function login(input: LoginInput) {
  const user = await findUserByEmail(input.email)

  if (!user) {
    throw new InvalidCredentialsError()
  }

  const passwordValid = await verifyPassword(
    input.password,
    user.passwordHash,
  )

  if (!passwordValid) {
    throw new InvalidCredentialsError()
  }

  const token = createAuthToken(user._id!.toString())

  return {
    user,
    token,
  }
}
