export interface UserSession {
  createdAt?: number
  device?: string
  expiresAt: number
  id: string
  token: string
  userId: string
}
