import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret'

export interface AuthTokenPayload {
  userId: string
}

export function createAuthToken(userId: string) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' },
  )
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload
}
