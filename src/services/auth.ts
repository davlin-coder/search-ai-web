import type { LoginRequest, RegisterRequest, VerificationCodeRequest } from '@/types/auth'

const API_BASE = 'http://127.0.0.1:8080/api/v1'

export async function login(data: LoginRequest) {
  const response = await fetch(`${API_BASE}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || '登录失败')
  }

  return response.json()
}

export async function register(data: RegisterRequest) {
  const response = await fetch(`${API_BASE}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || '注册失败')
  }

  return response.json()
}

export async function sendVerificationCode(data: VerificationCodeRequest) {
  const response = await fetch(`${API_BASE}/user/verify-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || '验证码发送失败')
  }

  return response.json()
}