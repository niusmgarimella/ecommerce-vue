<template>
  <div v-if="product" class="product-details">
    <RouterLink to="/" class="back-link">← Back to products</RouterLink>

    <div class="detail-layout">
      <img :src="product.thumbnail" :alt="product.title" class="product-image" />

      <div class="product-info">
        <p class="category">{{ product.category }}</p>
        <h1>{{ product.title }}</h1>

        <div class="meta-row">
          <span>⭐ {{ product.rating }}</span>
          <span>({{ product.reviews.length }} reviews)</span>
        </div>

        <p class="price">Price: ${{ product.price }}</p>
        <p class="description">{{ product.description }}</p>

        <div class="stats">
          <div><strong>Stock:</strong> {{ product.stock }}</div>
          <div><strong>Shipping:</strong> {{ product.shippingInformation }}</div>
          <div><strong>Warranty:</strong> {{ product.warrantyInformation }}</div>
          <div><strong>Return policy:</strong> {{ product.returnPolicy }}</div>
        </div>
        <div class="mt-4">
          <button @click.prevent="handleAddToCart" class="px-4 py-2 bg-green-600 text-white rounded">Add to cart</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">Loading product details...</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { Product } from '@/types/Products'
import { fetchProductById } from '@/services/apiService'

const route = useRoute()
const product = ref<Product | null>(null)

const productId = computed(() => Number(route.params.id))

const loadProduct = async () => {
  const id = productId.value

  if (!id || Number.isNaN(id)) {
    product.value = null
    return
  }

  product.value = await fetchProductById(id)
}

onMounted(() => {
  void loadProduct().catch((error) => {
    console.error('Error fetching product details:', error)
  })
})

watch(
  () => route.params.id,
  () => {
    void loadProduct().catch((error) => {
      console.error('Error fetching product details:', error)
    })
  },
)
import useCartStore from '@/stores/cartStore'

const cart = useCartStore()
const handleAddToCart = () => {
  if (product.value) cart.addToCart(product.value)
}
</script>

<style scoped>
.product-details {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
  gap: 2rem;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.product-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background: #f3f4f6;
}

.product-info h1 {
  margin: 0.4rem 0 1rem;
  font-size: 2rem;
}

.category {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: #2563eb;
  font-weight: 700;
}

.meta-row,
.price,
.description,
.stats {
  margin-top: 1rem;
}

.meta-row {
  display: flex;
  gap: 0.5rem;
  color: #4b5563;
}

.price {
  font-size: 1.7rem;
  font-weight: 700;
  color: #111827;
}

.description {
  color: #374151;
  line-height: 1.7;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 1rem;
  color: #374151;
}

.loading {
  text-align: center;
  margin-top: 2rem;
  color: #4b5563;
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
}
</style>
