<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="invoices"
      :sort-by="[{ key: 'date', order: 'desc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Invoice List</v-toolbar-title>
          <v-spacer></v-spacer>
          <AddInvoice @add-invoice="createInvoice" />
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon @click="editInvoice(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteInvoice(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import AddInvoice from "~/components/invoice/AddInvoice.vue";
import { useInvoiceStore } from "@/stores/invoice";

const invoiceStore = useInvoiceStore();
const invoices = ref(invoiceStore.invoices);
const headers = [
  { title: "Date", key: "date" },
  { title: "Customer Name", key: "customerName" },
  { title: "Total Amount", key: "totalAmount" },
  { title: "Actions", key: "actions", sortable: false },
];

const createInvoice = (newInvoice) => {
  invoiceStore.createInvoice(newInvoice);
};

const editInvoice = (item) => {
  // Logic to edit the invoice
};

const deleteInvoice = (item) => {
  // Logic to delete the invoice
};
</script>
