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

    // Function to generate dummy invoices
    generateDummyInvoices() {
      const dummyInvoices: Invoice[] = [
        {
          id: 1,
          invoiceNumber: "INV-10001",
          date: "2024-09-01",
          customerName: "John Doe",
          totalAmount: 150.0,
          status: "Paid",
        },
        {
          id: 2,
          invoiceNumber: "INV-10002",
          date: "2024-09-05",
          customerName: "Jane Smith",
          totalAmount: 250.0,
          status: "Pending",
        },
        {
          id: 3,
          invoiceNumber: "INV-10003",
          date: "2024-09-10",
          customerName: "Alice Johnson",
          totalAmount: 300.0,
          status: "Cancelled",
        },
      ];

      this.invoices.push(...dummyInvoices);
    },
  },
});
