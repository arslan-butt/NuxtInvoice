// stores/product.ts
import { defineStore } from "pinia";
import type { Product } from "@/types/product";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [
      { id: 1, name: "Product A", price: 100 },
      { id: 2, name: "Product B", price: 200 },
      // Additional products can be added here
    ] as Product[],
  }),
  actions: {
    addProduct(product: Product) {
      this.products.push(product);
    },
    updateProduct(id: number, updatedProduct: Partial<Product>) {
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },
    deleteProduct(id: number) {
      this.products = this.products.filter((product) => product.id !== id);
    },
  },
});
