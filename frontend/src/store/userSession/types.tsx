export interface UserSessionPlain {
    id: number,
    token: string
    expiresAt: Date
    createdAt: Date
}