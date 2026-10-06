import type { Product } from "@/types/Products";
import { defineStore } from "pinia";

const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    setProducts(products: Product[]) {
      this.products = products;
    },
  },
});

export default useProductStore;