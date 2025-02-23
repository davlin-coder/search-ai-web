<template>
  <main class="container mx-auto px-4 py-20">
    <div class="max-w-md mx-auto bg-black/20 backdrop-blur-glass p-8 rounded-2xl border border-gray-800/30 shadow-xl">
      <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-8">登录</h2>
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-400">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="请输入邮箱"
            required
          />
        </div>
        <div v-if="loginMode === 'password'" class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-400">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="请输入密码"
            required
          />
        </div>
        <div v-else class="space-y-2">
          <div class="flex justify-between items-center">
            <label for="code" class="block text-sm font-medium text-gray-400">验证码</label>
            <button
              type="button"
              @click="handleSendCode"
              :disabled="isCodeSending || countdown > 0"
              class="text-sm text-indigo-400 hover:text-indigo-300 disabled:text-gray-600 transition-colors"
            >
              {{ countdown > 0 ? `${countdown}秒后重试` : '发送验证码' }}
            </button>
          </div>
          <input
            type="text"
            id="code"
            v-model="code"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="请输入验证码"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="toggleLoginMode"
            class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {{ loginMode === 'password' ? '使用验证码登录' : '使用密码登录' }}
          </button>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-gray-100 font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-indigo-600"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, sendVerificationCode } from '@/services/auth'
import type { LoginRequest } from '@/types/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const code = ref('')
const loginMode = ref<'password' | 'code'>('password')
const isLoading = ref(false)
const isCodeSending = ref(false)
const countdown = ref(0)

const toggleLoginMode = () => {
  loginMode.value = loginMode.value === 'password' ? 'code' : 'password'
  password.value = ''
  code.value = ''
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleSendCode = async () => {
  if (!email.value) {
    alert('请输入邮箱')
    return
  }

  try {
    isCodeSending.value = true
    await sendVerificationCode({
      email: email.value
    })
    startCountdown()
  } catch (error) {
    alert(error instanceof Error ? error.message : '发送验证码失败')
  } finally {
    isCodeSending.value = false
  }
}

const handleLogin = async () => {
  const loginData: LoginRequest = {
    email: email.value,
    ...(loginMode.value === 'password'
      ? { password: password.value }
      : { code: code.value })
  }

  try {
    isLoading.value = true
    const response = await login(loginData)
    const { token } = response
    // 存储token到auth store
    const authStore = useAuthStore()
    authStore.setToken(token)
    // 登录成功后跳转到搜索页面
    router.push('/search')
  } catch (error) {
    alert(error instanceof Error ? error.message : '登录失败')
  } finally {
    isLoading.value = false
  }
}
</script>