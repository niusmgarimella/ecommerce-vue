import type { Product, ProductListResponse } from '@/types/Products'

const API_BASE_URL = 'https://dummyjson.com'

export const fetchProducts = async (query?: string, signal?: AbortSignal): Promise<Product[]> => {
  const url = query
    ? `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/products`

  const response = await fetch(url, signal ? { signal } : undefined)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = (await response.json()) as ProductListResponse
  return data.products ?? []
}

export const fetchProductById = async (id: string | number, signal?: AbortSignal): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, signal ? { signal } : undefined)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return (await response.json()) as Product
}