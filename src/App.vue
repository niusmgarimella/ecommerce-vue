<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/layout/Navbar.vue'

const searchQuery = ref('')

console.log('Search query:', searchQuery.value)
</script>

<template>
  <div class="bg-red-100 min-h-screen mx-auto">
    <Navbar v-model="searchQuery" />
    <div class="p-3">
      <RouterView v-slot="{ Component: RouteComponent } = {}">
        <component :is="RouteComponent" v-if="RouteComponent" :search-query="searchQuery" />
      </RouterView>
    </div>
  </div>
</template>

<style scoped></style>
