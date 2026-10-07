import type { Product } from '@/types/Products'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchProducts as fetchProductsFromApi } from '@/services/apiService'

const CUSTOM_PRODUCTS_KEY = 'custom-products'

const useProductStore = defineStore('productStore', () => {
  const apiProducts = ref<Product[]>([])
  const customProducts = ref<Product[]>([])

  const loadCustomProducts = () => {
    if (typeof window === 'undefined') {
      customProducts.value = []
      return []
    }

    try {
      const items = localStorage.getItem(CUSTOM_PRODUCTS_KEY)
      customProducts.value = items ? (JSON.parse(items) as Product[]) : []
    } catch (error) {
      console.error('Error loading custom products:', error)
      customProducts.value = []
    }

    return customProducts.value
  }

  const persistCustomProducts = () => {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts.value))
  }

  const fetchProducts = async (query?: string, signal?: AbortSignal): Promise<Product[]> => {
    const result = await fetchProductsFromApi(query, signal)
    apiProducts.value = result
    return mergedProducts.value
  }

  const addProduct = (product: Product) => {
    const nextProduct = {
      ...product,
      id: product.id || Date.now(),
    }

    customProducts.value = [...customProducts.value, nextProduct]
    persistCustomProducts()
    return nextProduct
  }

  const mergedProducts = computed(() => [...apiProducts.value, ...customProducts.value])

  loadCustomProducts()

  return {
    apiProducts,
    customProducts,
    mergedProducts,
    fetchProducts,
    addProduct,
    loadCustomProducts,
  }
})

export default useProductStore