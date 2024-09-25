import { defineStore } from "pinia";
import type { Invoice } from "@/types/invoice";
import type { Product } from "@/types/product";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [] as Invoice[],
    products: [] as Product[],
  }),

  actions: {
    createInvoice(newInvoice: Invoice) {
      this.invoices.push(newInvoice);
    },

    updateInvoice(updatedInvoice: Invoice) {
      const index = this.invoices.findIndex(
        (invoice) => invoice.id === updatedInvoice.id
      );
      if (index !== -1) {
        this.invoices[index] = updatedInvoice;
      }
    },

    deleteInvoice(id: number) {
      this.invoices = this.invoices.filter((invoice) => invoice.id !== id);
    },

    setProducts(productList: Product[]) {
      this.products = productList;
    },
  },
});
