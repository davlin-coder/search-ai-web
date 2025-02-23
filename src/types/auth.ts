export interface LoginRequest {
  email: string
  password?: string
  code?: string
}

export interface RegisterRequest {
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