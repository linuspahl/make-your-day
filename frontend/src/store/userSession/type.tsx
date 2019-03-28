export interface UserSession {
  createdAt?: string
  device?: string
  expiresAt: string
  id: number
  token: string
  userId: number
}
