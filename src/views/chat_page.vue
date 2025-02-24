<template>
  <main class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/5 min-h-[80vh] flex flex-col">
      <!-- Message List Area -->
      <div class="flex-1 overflow-y-auto mb-4 space-y-4" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index" :class="['flex', message.isUser ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-[80%] rounded-2xl p-4', message.isUser ? 'bg-indigo-500/20' : 'bg-white/10']">
            <!-- Text Message -->
            <p v-if="!message.image" class="text-gray-200 text-sm">
              {{ message.content }}
            </p>
            <!-- Image Message -->
            <div v-else class="relative">
              <img :src="message.content" alt="Uploaded image" class="max-w-full rounded-lg">
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-white/10 pt-4">
        <div class="relative">
          <SearchInput
            v-model="currentMessage"
            :placeholder="'Enter message...'"
            :show-model-selector="false"
            :input-height="'40px'"
            @search="sendMessage"
          />
          <!-- Image Upload Button -->
          <label class="absolute right-16 bottom-4 p-2 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors z-10">
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import SearchInput from '../components/SearchInput.vue'
import { useRoute } from 'vue-router'

interface Message {
  content: string
  isUser: boolean
  image?: boolean
}

const route = useRoute()
const messages = ref<Message[]>([])
const currentMessage = ref('')
const selectedImage = ref<File | null>(null)
const messageContainer = ref<HTMLElement | null>(null)
const enableResearch = ref(false)
const enableThink = ref(false)
const selectedModel = ref('')

// 初始化聊天参数
onMounted(() => {
  const query = route.query
  if (query.q) {
    messages.value.push({
      content: query.q as string,
      isUser: true
    })
    // 模拟AI响应
    setTimeout(async () => {
      messages.value.push({
        content: 'This is a simulated AI response message',
        isUser: false
      })
      await scrollToBottom()
    }, 1000)
  }
  
  enableResearch.value = query.research === '1'
  enableThink.value = query.think === '1'
  selectedModel.value = query.model as string || ''
})

// Send message
const sendMessage = async () => {
  if (!currentMessage.value.trim() && !selectedImage.value) return

  if (selectedImage.value) {
    // Handle image message
    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageData = e.target?.result as string
      messages.value.push({
        content: imageData,
        isUser: true,
        image: true
      })
      selectedImage.value = null
      await scrollToBottom()
    }
    reader.readAsDataURL(selectedImage.value)
  } else {
    // Handle text message
    messages.value.push({
      content: currentMessage.value,
      isUser: true
    })
    currentMessage.value = ''
    await scrollToBottom()

    setTimeout(async () => {
      messages.value.push({
        content: 'This is a simulated AI response message',
        isUser: false
      })
      await scrollToBottom()
    }, 1000)
  }
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedImage.value = input.files[0]
    sendMessage()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

onMounted(() => {
})
</script>

<style scoped>
/* Custom scrollbar styles */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>