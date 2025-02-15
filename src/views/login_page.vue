<template>
  <main class="container mx-auto px-4 py-20">
    <div class="max-w-md mx-auto bg-black/20 backdrop-blur-glass p-8 rounded-2xl border border-gray-800/30 shadow-xl">
      <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-8">登录</h2>
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-400">用户名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-4 py-3 bg-black/30 border border-gray-800/50 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="space-y-2">
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
        <button
          type="submit"
          class="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-gray-100 font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105"
        >
          登录
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  // TODO: 实现登录逻辑
  console.log('Login attempt:', { username: username.value, password: password.value })
}
</script>