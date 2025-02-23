import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: string
  username: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  // 解析JWT token并提取用户信息
  function parseJWTToken(jwtToken: string): User | null {
    try {
      const tokenParts = jwtToken.split('.')
      if (tokenParts.length !== 3) {
        throw new Error('Invalid JWT token format')
      }

      const payload = JSON.parse(atob(tokenParts[1]))
      if (!payload.sub && !payload.id) {
        throw new Error('Missing user ID in token payload')
      }

      return {
        id: payload.sub || payload.id,
        username: payload.username || payload.email.split('@')[0], // 如果没有username，使用email的用户名部分
        email: payload.email
      }
    } catch (error) {
      console.error('解析JWT token失败:', error)
      return null
    }
  }

  // 初始化时解析token
  if (token.value) {
    const userData = parseJWTToken(token.value)
    if (!userData) {
      // 如果token解析失败，清除无效token
      token.value = null
      localStorage.removeItem('token')
    } else {
      user.value = userData
    }
  }

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string | null) {
    if (newToken) {
      const userData = parseJWTToken(newToken)
      if (userData) {
        token.value = newToken
        localStorage.setItem('token', newToken)
        user.value = userData
      } else {
        // 如果token解析失败，不更新状态
        console.warn('无效的JWT token，登录失败')
        throw new Error('登录失败：无效的认证信息')
      }
    } else {
      token.value = null
      localStorage.removeItem('token')
      user.value = null
    }
  }

  function logout() {
    setToken(null)
  }

  return {
    token,
    user,
    isAuthenticated,
    setToken,
    logout
  }
})