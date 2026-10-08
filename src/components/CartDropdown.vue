<template>
  <div class="ml-4 relative">
    <button @click="toggleCart" class="flex items-center gap-2">
      <span class="text-sm">Cart</span>
      <div class="bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">{{ cartCount }}</div>
    </button>

    <div v-if="open" class="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg z-50">
      <div class="p-3">
        <h4 class="font-semibold">Cart</h4>
      </div>
      <div v-if="items.length === 0" class="p-3 text-sm text-gray-600">Your cart is empty</div>
      <ul v-else class="divide-y">
        <li v-for="item in items" :key="item.product.id" class="flex items-center gap-3 p-3">
          <img :src="item.product.thumbnail" :alt="item.product.title" class="w-12 h-12 object-cover rounded" />
          <div class="flex-1">
            <div class="font-medium">{{ item.product.title }}</div>
            <div class="text-sm text-gray-600">Qty: {{ item.quantity }}</div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="decrease(item.product.id)" class="px-2 py-1 bg-gray-200 rounded">-</button>
            <div>{{ item.quantity }}</div>
            <button @click="increase(item.product)" class="px-2 py-1 bg-gray-200 rounded">+</button>
            <button @click="remove(item.product.id)" class="px-2 py-1 text-red-600">Remove</button>
          </div>
        </li>
      </ul>
      <div class="p-3 border-t flex justify-end gap-2">
        <RouterLink to="/cart">View Cart</RouterLink> || <button @click="clearCart" class="px-3 py-1 text-sm bg-gray-100 rounded">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useCartStore from '@/stores/cartStore'
import { RouterLink } from 'vue-router'

const cart = useCartStore()
const cartCount = computed(() => cart.totalCount)
const items = computed(() => cart.items)

const open = ref(false)
const toggleCart = () => (open.value = !open.value)
const decrease = (id: number) => cart.decreaseQuantity(id)
const increase = (product: any) => cart.addToCart(product)
const remove = (id: number) => cart.removeFromCart(id)
const clearCart = () => cart.clearCart()
</script>

<style scoped>
.w-80 { width: 20rem; }
</style>
