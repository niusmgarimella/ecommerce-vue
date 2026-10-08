<template>
  <form class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm" @submit.prevent="submitProduct">
    <h2 class="mb-3 text-lg font-semibold">Add New Product</h2>

    <div class="grid gap-3 md:grid-cols-2">
      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Title
        <input v-model="form.title" required class="rounded border border-gray-300 px-3 py-2" type="text" />
      </label>

      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Category
        <input v-model="form.category" required class="rounded border border-gray-300 px-3 py-2" type="text" />
      </label>

      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
        Description
        <textarea v-model="form.description" required class="rounded border border-gray-300 px-3 py-2" rows="3" />
      </label>

      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Price
        <input v-model.number="form.price" required min="0" class="rounded border border-gray-300 px-3 py-2" type="number" />
      </label>

      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Rating
        <input v-model.number="form.rating" min="0" max="5" step="0.1" class="rounded border border-gray-300 px-3 py-2" type="number" />
      </label>

      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Stock
        <input v-model.number="form.stock" min="0" class="rounded border border-gray-300 px-3 py-2" type="number" />
      </label>

      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Thumbnail URL
        <input v-model="form.thumbnail" required class="rounded border border-gray-300 px-3 py-2" type="url" />
      </label>
    </div>

    <button type="submit" class="mt-4 rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
      Add Product
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useProductStore from '@/stores/productStore'
import type { Product } from '@/types/Products'

const emit = defineEmits<{
  (event: 'product-added'): void
}>()

const productStore = useProductStore()

const form = reactive({
  title: '',
  category: '',
  description: '',
  price: 0,
  rating: 0,
  stock: 0,
  thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp',
})

const submitProduct = () => {
  const newProduct: Product = {
    id: Date.now(),
    title: form.title.trim(),
    description: form.description.trim(),
    category: form.category.trim(),
    price: Number(form.price),
    discountPercentage: 0,
    rating: Number(form.rating) || 0,
    stock: Number(form.stock) || 0,
    tags: [form.category.trim().toLowerCase()],
    sku: `sku-${Date.now()}`,
    weight: 1,
    dimensions: { width: 1, height: 1, depth: 1 },
    warrantyInformation: 'No warranty information',
    shippingInformation: 'Standard shipping',
    availabilityStatus: 'In Stock',
    reviews: [],
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: `barcode-${Date.now()}`,
      qrCode: `qrcode-${Date.now()}`,
    },
    images: [form.thumbnail],
    thumbnail: form.thumbnail,
  }

  productStore.addProduct(newProduct)
  emit('product-added')

  form.title = ''
  form.category = ''
  form.description = ''
  form.price = 0
  form.rating = 0
  form.stock = 0
  form.thumbnail = ''
}
</script>
