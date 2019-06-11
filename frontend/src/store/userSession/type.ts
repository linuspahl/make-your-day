export interface UserSession {
  createdAt?: number
  device?: string
  expiresAt: number
  id: number
  token: string
  userId: number
}
