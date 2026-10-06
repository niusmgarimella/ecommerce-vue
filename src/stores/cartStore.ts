import type { Product } from '@/types/Products'
import { defineStore } from 'pinia'

type CartItem = {
  product: Product
  quantity: number
}

const useCartStore = defineStore('cartStore', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalCount: (state) => state.items.reduce((s, i) => s + i.quantity, 0),
  },
  actions: {
    addToCart(product: Product) {
      const existing = this.items.find((i) => i.product.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },
    decreaseQuantity(productId: number) {
      const existing = this.items.find((i) => i.product.id === productId)
      if (!existing) return
      if (existing.quantity > 1) {
        existing.quantity -= 1
      } else {
        this.items = this.items.filter((i) => i.product.id !== productId)
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId)
    },
    clearCart() {
      this.items = []
    },
  },
})

export default useCartStore
