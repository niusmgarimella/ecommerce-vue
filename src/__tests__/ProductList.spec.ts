import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import ProductList from '../views/ProductList.vue'

const createTestRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'ProductList', component: ProductList },
      { path: '/about', name: 'About', component: { template: '<div>About</div>' } },
      { path: '/contact', name: 'Contact', component: { template: '<div>Contact</div>' } },
      { path: '/products/:id', name: 'ProductDetails', component: { template: '<div>Details</div>' } },
    ],
  })

describe('ProductList', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          products: [
            {
              id: 1,
              title: 'Phone',
              description: 'Smartphone',
              category: 'electronics',
              price: 999,
              discountPercentage: 10,
              rating: 4.5,
              stock: 12,
              tags: ['mobile'],
              sku: 'sku-1',
              weight: 0.2,
              dimensions: { width: 7, height: 15, depth: 0.7 },
              warrantyInformation: '1 year',
              shippingInformation: 'Delivery in 3 days',
              availabilityStatus: 'In Stock',
              reviews: [],
              returnPolicy: '30 days',
              minimumOrderQuantity: 1,
              meta: {
                createdAt: '2024-01-01',
                updatedAt: '2024-01-02',
                barcode: 'abc',
                qrCode: 'qrcode',
              },
              images: ['https://example.com/image.jpg'],
              thumbnail: 'https://example.com/thumb.jpg',
            },
          ],
        }),
      }),
    )
  })

  it('searches via the dummyjson API using the current query', async () => {
    vi.useFakeTimers()
    const router = createTestRouter()

    const wrapper = mount(ProductList, {
      props: { searchQuery: 'phone' },
      global: {
        plugins: [router, createPinia()],
      },
    })

    await vi.runAllTimersAsync()
    await wrapper.vm.$nextTick()

    expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products/search?q=phone', expect.any(Object))
    expect(wrapper.text()).toContain('Phone')

    vi.useRealTimers()
  })

  it('renders each product as a detail link', async () => {
    vi.useFakeTimers()
    const router = createTestRouter()

    const wrapper = mount(ProductList, {
      props: { searchQuery: '' },
      global: {
        plugins: [router, createPinia()],
      },
    })

    await vi.runAllTimersAsync()
    await wrapper.vm.$nextTick()

    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].attributes('href')).toContain('/products/1')

    vi.useRealTimers()
  })
})
