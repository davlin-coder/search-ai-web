<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-primary-950">
    <nav class="backdrop-blur-glass bg-black/20 border-b border-gray-800/30 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-6">
            <router-link to="/" class="flex items-center space-x-6">
              <svg class="w-8 h-8 text-indigo-400 hover:text-indigo-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <div class="flex items-center space-x-3">
                <span class="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-300 rounded-full hover:bg-indigo-500/20 transition-all cursor-pointer">Search AI</span>
              </div>
            </router-link>
          </div>
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="text-gray-400 hover:text-gray-300 text-sm font-medium transition-all hover:scale-105 flex items-center space-x-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
              </svg>
              <span>Login</span>
            </router-link>
          </template>
          <template v-else>
            <div class="flex items-center space-x-4">
              <span class="text-gray-100 text-sm font-medium">{{ authStore.user?.username }}</span>
              <button @click="handleLogout" class="text-gray-400 hover:text-gray-300 text-sm font-medium transition-all hover:scale-105 flex items-center space-x-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>logout</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style>
</style>