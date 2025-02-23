<template>
  <main class="container mx-auto px-4 py-20">
    <div class="max-w-md mx-auto bg-black/20 backdrop-blur-glass p-8 rounded-2xl border border-gray-800/30 shadow-xl">
      <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-8">Register</h2>
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-400">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-400">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-400">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="Re-enter your password"
            required
          />
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label for="code" class="block text-sm font-medium text-gray-400">Verification Code</label>
            <button
              type="button"
              @click="handleSendCode"
              :disabled="isCodeSending || countdown > 0"
              class="text-sm text-indigo-400 hover:text-indigo-300 disabled:text-gray-600 transition-colors"
            >
              {{ countdown > 0 ? `Retry in ${countdown}s` : 'Send Code' }}
            </button>
          </div>
          <input
            type="text"
            id="code"
            v-model="code"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="Enter verification code"
            required
          />
        </div>
        <div class="flex justify-end">
          <router-link
            to="/login"
            class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Already have an account? Login
          </router-link>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-gray-100 font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-indigo-600"
        >
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register, sendVerificationCode } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const code = ref('')
const isLoading = ref(false)
const isCodeSending = ref(false)
const countdown = ref(0)

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

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }

  try {
    isLoading.value = true
    const response = await register({
      username: username.value,
      email: email.value,
      password: password.value,
      code: code.value
    })
    const { token } = response
    // 存储token到auth store
    const authStore = useAuthStore()
    authStore.setToken(token)
    // 注册成功后跳转到搜索页面
    router.push('/search')
  } catch (error) {
    alert(error instanceof Error ? error.message : '注册失败')
  } finally {
    isLoading.value = false
  }
}
</script>