<template>
  <main class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center space-y-8">
      <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-200 via-gray-200 to-gray-400 tracking-tight leading-tight font-orbitron animate-title">
        Welcome to Search AI
      </h1>
      <SearchInput
        @search="handleSearch"
        :enableTypewriter="true"
        :input-height="'80px'"
        :exampleQueries="[
          'Analyze the potential impact of quantum computing on cryptography and cybersecurity in the next decade...',
          'How can AI be effectively integrated into education systems while addressing ethical concerns and ensuring equal access?',
          'Evaluate the economic implications of renewable energy transition for developing countries...',
          'What are the most promising technological solutions for large-scale carbon capture and environmental restoration?',
          'Assess the long-term effects of remote work and digital transformation on global workforce dynamics and economic structures...'
        ]"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import SearchInput from '../components/SearchInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSearch = (searchData: {
  query: string
  enableResearch: boolean
  enableThink: boolean
  selectedModel: string
}) => {
  if (!searchData.query.trim()) {
    return
  }
  router.push({
    path: '/chat',
    query: {
      q: searchData.query,
      research: searchData.enableResearch ? '1' : '0',
      think: searchData.enableThink ? '1' : '0',
      model: searchData.selectedModel
    }
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}

.animate-title {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>