<template>
  <main class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center space-y-8">
      <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-200 via-gray-200 to-gray-400 tracking-tight leading-tight font-orbitron animate-title">
        Welcome to Search AI
      </h1>
      <div class="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/5">
        <textarea
          v-model="query"
          @focus="stopTypewriterAnimation"
          @blur="startTypewriterAnimation"
          class="w-full min-h-32 bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none text-lg"
          :placeholder="currentPlaceholder"
        />
        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center space-x-3">
            <button
              @click="enableResearch = !enableResearch"
              :class="[
                'px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center space-x-2',
                enableResearch
                  ? 'bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/10 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              ]"
            >
              <span class="text-sm font-medium">Research</span>
              <div
                :class="[
                  'w-1.5 h-1.5 rounded-full transition-all duration-300',
                  enableResearch ? 'bg-indigo-400' : 'bg-gray-600'
                ]"
              />
            </button>
            <button
              @click="enableThink = !enableThink"
              :class="[
                'px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center space-x-2',
                enableThink
                  ? 'bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/10 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              ]"
            >
              <span class="text-sm font-medium">Think</span>
              <div
                :class="[
                  'w-1.5 h-1.5 rounded-full transition-all duration-300',
                  enableThink ? 'bg-indigo-400' : 'bg-gray-600'
                ]"
              />
            </button>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <button
                @click="isModelDropdownOpen = !isModelDropdownOpen"
                class="bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex items-center space-x-2 text-sm transition-all"
              >
                <span>{{ selectedModel }}</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': isModelDropdownOpen }"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                v-if="isModelDropdownOpen"
                class="absolute z-10 mt-2 w-64 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-800/30 shadow-xl py-1 text-sm right-0"
              >
                <button
                  v-for="model in models"
                  :key="model.value"
                  @click="selectModel(model.value)"
                  class="w-full px-4 py-2 text-left hover:bg-white/5 flex flex-col space-y-1 transition-colors"
                >
                  <span class="text-gray-200 font-medium">{{ model.label }}</span>
                  <span class="text-gray-500 text-xs">{{ model.description }}</span>
                </button>
              </div>
            </div>
            <button
              @click="handleSearch"
              class="p-2 bg-white/10 hover:bg-white/20 text-gray-300 text-sm font-medium rounded-full transition-all backdrop-blur-sm hover:scale-105 group"
            >
              <svg class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const query = ref('')
const enableResearch = ref(false)
const enableThink = ref(false)
const selectedModel = ref('Deepseek')
const isModelDropdownOpen = ref(false)
const currentPlaceholder = ref('')

const exampleQueries = [
  'Analyze the potential impact of quantum computing on cryptography and cybersecurity in the next decade...',
  'How can artificial intelligence be effectively integrated into education systems while addressing ethical concerns and ensuring equal access?',
  'Evaluate the economic implications of transitioning to renewable energy sources on developing nations...',
  'What are the most promising technological solutions for large-scale carbon capture and environmental restoration?',
  'Assess the long-term effects of remote work and digital transformation on global workforce dynamics and economic structures...'
]

let currentQueryIndex = 0
let currentCharIndex = 0
let typewriterInterval: number | null = null

const typeNextChar = () => {
  const currentQuery = exampleQueries[currentQueryIndex]
  if (currentCharIndex < currentQuery.length) {
    currentPlaceholder.value = currentQuery.substring(0, currentCharIndex + 1)
    currentCharIndex++
  } else {
    setTimeout(() => {
      currentCharIndex = 0
      currentQueryIndex = (currentQueryIndex + 1) % exampleQueries.length
      currentPlaceholder.value = ''
    }, 1000)
  }
}

const startTypewriterAnimation = () => {
  if (!typewriterInterval) {
    currentQueryIndex = 0
    currentCharIndex = 0
    currentPlaceholder.value = ''
    typewriterInterval = window.setInterval(typeNextChar, 20)
  }
}

const stopTypewriterAnimation = () => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval)
    typewriterInterval = null
    currentPlaceholder.value = ''
  }
}

onMounted(() => {
  startTypewriterAnimation()
})

onUnmounted(() => {
  stopTypewriterAnimation()
})

const models = [
  {
    value: 'Deepseek',
    label: 'deekseep',
    description: '最强大的模型，适用于复杂任务和深度研究'
  }
]

const selectModel = (value: string) => {
  selectedModel.value = value
  isModelDropdownOpen.value = false
}

const handleSearch = () => {
  console.log({
    query: query.value,
    enableResearch: enableResearch.value,
    enableThink: enableThink.value,
    selectedModel: selectedModel.value
  })
}
</script>
```

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