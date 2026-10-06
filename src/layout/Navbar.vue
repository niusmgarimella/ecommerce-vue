
<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center gap-4">
      <ul class="flex space-x-4">
        <li><RouterLink to="/" class="hover:text-gray-400">Home</RouterLink></li>
        <li><RouterLink to="/about" class="hover:text-gray-400">About</RouterLink></li>
        <li><RouterLink to="/contact" class="hover:text-gray-400">Contact</RouterLink></li>
      </ul>

      <div class="search-box">
        <input
          type="search"
          :value="modelValue"
          @input="onInput"
          placeholder="Search products..."
          class="search-input"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.search-box {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.search-input {
  width: min(100%, 320px);
  padding: 0.6rem 0.9rem;
  border: 1px solid #4b5563;
  border-radius: 9999px;
  background: #1f2937;
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: #9ca3af;
}
</style>