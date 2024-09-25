<template>
  <v-dialog v-model="dialog" width="1000">
    <template v-slot:activator="{ props }">
      <v-btn
        prepend-icon="mdi-plus"
        color="primary"
        variant="flat"
        v-bind="props"
      >
        New Invoice
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="invoice.customerName"
                label="Customer Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="invoice.date"
                label="Date"
                type="date"
              ></v-text-field>
              <!-- <v-date-input
                v-model="invoice.date"
                label="Select a date"
                prepend-icon=""
                prepend-inner-icon="$calendar"
                variant="solo"
              ></v-date-input> -->
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-row v-for="(item, index) in invoice.items" :key="index">
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="item.productId"
                :items="products"
                item-title="name"
                item-value="id"
                label="Select Product"
                @change="updateUnitPrice(index)"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Product Name"
                variant="outlined"
                :value="getProductName(item.productId)"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                label="Unit Price"
                variant="outlined"
                :value="item.unitPrice"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="item.total"
                label="Total"
                type="number"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                label="Discount %"
                variant="outlined"
                v-model="invoice.discount"
                type="number"
                @input="calculateFinalTotal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                icon="mdi-delete"
                variant="text"
                @click="removeItem(index)"
                color="red"
              >
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn variant="tonal" rounded="xl" block @click="addItem"
                >Add Item</v-btn
              >
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-row>
            <v-col cols="12" md="2">
              <v-text-field
                :value="finalTotal"
                label="Final Total"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveInvoice">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product"; // Assuming you have a product store
import { defineEmits } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const emit = defineEmits();
const dialog = ref(false);
const invoice = ref({
  customerName: "",
  date: "",
  items: [],
  discount: 0,
});
const productStore = useProductStore();
const products = productStore.products;

// Computed property for final total
const finalTotal = computed(() => {
  const total = invoice.value.items.reduce(
    (acc, item) => acc + Number(item.total),
    0
  );
  const discountAmount = Number(invoice.value.discount);
  return total - discountAmount >= 0 ? total - discountAmount : 0;
});

// Function to add an item
const addItem = () => {
  invoice.value.items.push({
    productId: null,
    unitPrice: 0,
    total: 0,
  });
};

// Function to remove an item
const removeItem = (index) => {
  invoice.value.items.splice(index, 1);
  calculateFinalTotal();
};

// Function to update the unit price based on selected product
const updateUnitPrice = (index) => {
  const selectedProduct = products.find(
    (product) => product.id === invoice.value.items[index].productId
  );
  if (selectedProduct) {
    invoice.value.items[index].unitPrice = selectedProduct.price || 0; // Assuming the product has a price field
    updateTotal(index);
  }
};

// Function to update the total for an item
const updateTotal = (index) => {
  const item = invoice.value.items[index];
  item.total = item.unitPrice * 1; // Assuming quantity is 1 for now
  calculateFinalTotal();
};

// Function to calculate the final total
const calculateFinalTotal = () => {
  // Trigger computed property to recalculate final total
};

// Function to get the product name for display
const getProductName = (productId) => {
  const product = products.find((product) => product.id === productId);
  return product ? product.name : "";
};

// Function to save the invoice
const saveInvoice = () => {
  emit("add-invoice", { ...invoice.value, total: finalTotal.value });
  close();
};

// Function to close the dialog
const close = () => {
  dialog.value = false;
  invoice.value = { customerName: "", date: "", items: [], discount: 0 };
};
</script>

<style scoped></style>
