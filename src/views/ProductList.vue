
<template>
  <div class="container mx-auto">
    <div class="mb-4 flex items-center justify-between gap-3">
      <h1>Product List | product Grid</h1>
      <button @click="showGridView = !showGridView" class="toggle-button mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Toggle View
      </button>
    </div>

    <div class="product-list" v-if="showGridView">
      <div v-for="product in products" :key="`${product.id}-${product.title}`" class="card">
        <RouterLink :to="`/products/${product.id}`" class="product-link">
          <img :src="product.thumbnail" :alt="product.title" class="product-image" />
        </RouterLink>

        <div class="content">
          <h2>{{ product.title }}</h2>
          <p class="category">{{ product.category }}</p>
          <p>{{ product.description.slice(0, 100) }}</p>
          <div class="rating">
            <span>⭐ {{ product.rating }}</span>
            <span>({{ product.reviews.length }} reviews)</span>
          </div>
          <p class="price">Price: ${{ product.price }}</p>
          <div class="mt-3 flex gap-2">
            <button @click.prevent="addToCart(product)" class="px-3 py-1 bg-green-600 text-white rounded cursor-pointer">Add to cart</button>
            <RouterLink :to="`/products/${product.id}`" class="text-sm text-blue-600 underline">View details</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <ProductGrid :products="products" v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product } from '@/types/Products'
import ProductGrid from '@/components/ProductGrid.vue'
import useCartStore from '@/stores/cartStore'
import useProductStore from '@/stores/productStore'

const props = defineProps<{ searchQuery?: string }>()
const productStore = useProductStore()
const products = computed(() => productStore.mergedProducts)
let searchTimer: ReturnType<typeof setTimeout> | null = null
let abortController: AbortController | null = null

const showGridView = ref(true)

const loadProducts = async () => {
  abortController?.abort()
  abortController = new AbortController()

  try {
    const query = props.searchQuery?.trim() ?? ''
    await productStore.fetchProducts(query, abortController.signal)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return
    }
    console.error('Error fetching products:', error)
  }
}

const cart = useCartStore()
const addToCart = (product: Product) => {
  cart.addToCart(product)
}

const searchProducts = async () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    void loadProducts()
  }, 400)
}

onMounted(() => {
  void searchProducts()
})

watch(
  () => props.searchQuery,
  () => {
    void searchProducts()
  },
)
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.product-link {
  color: inherit;
  text-decoration: none;
  display: block;
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.content {
  padding: 1rem;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.category,
.rating,
.price {
  margin: 0.35rem 0;
  color: #555;
}

.price {
  font-weight: 700;
  color: #111;
}

.cursor-pointer {
  cursor: pointer;
}
</style>