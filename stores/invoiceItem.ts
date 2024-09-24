// stores/invoiceItem.ts
import { defineStore } from "pinia";
import type { InvoiceItem } from "@/types/invoiceItem";

export const useInvoiceItemStore = defineStore("invoiceItem", {
  state: () => ({
    items: [] as InvoiceItem[],
  }),
  actions: {
    addInvoiceItem(item: InvoiceItem) {
      this.items.push(item);
    },
    removeInvoiceItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    updateInvoiceItem(id: number, updatedItem: Partial<InvoiceItem>) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updatedItem };
      }
    },
    getItemsByInvoiceId(invoiceId: number) {
      return this.items.filter((item) => item.invoiceId === invoiceId);
    },
  },
});
