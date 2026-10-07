import { reactive, readonly, computed } from 'vue'
import type { Product } from '@/types/Products'

export type CartItem = {
  product: Product
  quantity: number
}

// Module-scoped reactive state so `useCart` is a singleton across imports
const state = reactive<{ items: CartItem[] }>({ items: [] })

export function useCart() {
  const items = computed(() => state.items)

  const totalCount = computed(() => state.items.reduce((s, i) => s + i.quantity, 0))

  function findIndex(productId: number) {
    return state.items.findIndex((i) => i.product.id === productId)
  }

  function addToCart(product: Product) {
    const idx = findIndex(product.id)
    if (idx >= 0) {
      state.items[idx].quantity += 1
    } else {
      state.items.push({ product, quantity: 1 })
    }
  }

  function decreaseQuantity(productId: number) {
    const idx = findIndex(productId)
    if (idx === -1) return
    const item = state.items[idx]
    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      state.items.splice(idx, 1)
    }
  }

  function removeFromCart(productId: number) {
    const idx = findIndex(productId)
    if (idx === -1) return
    state.items.splice(idx, 1)
  }

  function clearCart() {
    state.items.splice(0, state.items.length)
  }

  return {
    items,
    totalCount,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }
}

export default useCart
