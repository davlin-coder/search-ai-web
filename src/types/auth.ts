export interface LoginRequest {
  email: string
  password?: string
  code?: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  code: string
}

export interface VerificationCodeRequest {
  email: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    createdAt: string
    updatedAt: string
  }
}