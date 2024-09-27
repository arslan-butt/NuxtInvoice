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

      <template v-slot:item.invoiceNumber="{ item }">
        <strong>{{ item.invoiceNumber }}</strong>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" text-color="white">
          {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon @click="editInvoice(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteInvoice(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AddInvoice from "~/components/invoice/AddInvoice.vue";
import { useInvoiceStore } from "@/stores/invoice";

const invoiceStore = useInvoiceStore();
const invoices = shallowReactive(invoiceStore.invoices);

const headers = [
  { title: "Date", key: "date" },
  { title: "Invoice Number", key: "invoiceNumber" },
  { title: "Customer Name", key: "customerName" },
  { title: "Total Amount", key: "totalAmount", align: "end" },
  { title: "Status", key: "status" }, // New Status Column
  { title: "Actions", key: "actions", sortable: false },
];

// Generate dummy invoices on component mount
onMounted(() => {
  invoiceStore.generateDummyInvoices();
});

// Create a new invoice
const createInvoice = (newInvoice) => {
  invoiceStore.createInvoice(newInvoice);
};

// Edit invoice logic (placeholder)
const editInvoice = (item) => {
  // Logic to edit the invoice
};

// Delete invoice logic
const deleteInvoice = (id) => {
  invoiceStore.deleteInvoice(id);
};

// Function to get color based on status
const getStatusColor = (status) => {
  switch (status) {
    case "Paid":
      return "success"; // Green for Paid
    case "Pending":
      return "warning"; // Yellow for Pending
    case "Cancelled":
      return "error"; // Red for Cancelled
    default:
      return "grey"; // Default color
  }
};
</script>
