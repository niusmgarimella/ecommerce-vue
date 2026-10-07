import type { Product } from '@/types/Products'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

type CartItem = {
  product: Product
  quantity: number
}

const useCartStore = defineStore('cartStore', () => {
  const items = ref<CartItem[]>([])

  const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const addToCart = (product: Product) => {
    const existing = items.value.find((item) => item.product.id === product.id)

    if (existing) {
      existing.quantity += 1
      return
    }

    items.value = [...items.value, { product, quantity: 1 }]
  }

  const decreaseQuantity = (productId: number) => {
    const existing = items.value.find((item) => item.product.id === productId)

    if (!existing) {
      return
    }

    if (existing.quantity > 1) {
      existing.quantity -= 1
      return
    }

    items.value = items.value.filter((item) => item.product.id !== productId)
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter((item) => item.product.id !== productId)
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalCount,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }
})

export default useCartStore
