<template>
  <main class="container mx-auto px-4 py-20">
    <div class="max-w-4xl text-left space-y-8">
      <h1 class="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 tracking-tight leading-tight">
        Intelligent Research AI
      </h1>
      <p class="text-xl text-gray-500/90 max-w-2xl">
        Empowering researchers with advanced AI technology for intelligent literature search, data analysis, and research assistance, making academic work more efficient and smarter.
      </p>
      <div class="flex items-center space-x-4 pt-4">
        <router-link to="/login" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-gray-100 font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 inline-block">
          Get Started
        </router-link>
        <button class="px-6 py-3 bg-white/3 hover:bg-white/5 text-gray-400 hover:text-gray-300 font-semibold rounded-xl transition-all flex items-center backdrop-blur-sm hover:scale-105">
          Learn More
          <svg class="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>