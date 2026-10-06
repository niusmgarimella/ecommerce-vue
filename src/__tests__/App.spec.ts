import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from '../App.vue'
import ProductList from '../views/ProductList.vue'

describe('App', () => {
  it('mounts and renders the navigation shell', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'ProductList', component: ProductList },
        { path: '/about', name: 'About', component: { template: '<div>About</div>' } },
        { path: '/contact', name: 'Contact', component: { template: '<div>Contact</div>' } },
      ],
    })

    const pinia = createPinia()

    const wrapper = mount(App, {
      global: {
        plugins: [router, pinia],
      },
    })

    await router.isReady()

    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('Contact')
  })
})
