<template>
  <v-dialog v-model="dialog" width="90%">
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
      <v-divider class="mb-4"></v-divider>

      <v-card-text>
        <!-- Header Section (Current Date, Invoice Number, Due Date) -->

        <v-row dense class="pb-4">
          <v-col cols="6" class="">
            <v-card color="info" variant="tonal" class="pa-2" flat>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Invoice number"
                    v-model="invoiceNumber"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="invoice.invoiceDate"
                    type="date"
                    label="Invoice date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Due date"
                    v-model="invoice.dueDate"
                    type="date"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Currency and Rates Section -->
          <v-col cols="6" class="">
            <v-card color="primary" variant="tonal" class="pa-2" flat>
              <v-row align-content="end">
                <v-col cols="12" md="4">
                  <v-select
                    v-model="invoice.currency"
                    :items="currencies"
                    label="Currency"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model.number="invoice.taxRate"
                    label="Tax rate"
                    type="number"
                    suffix="%"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model.number="invoice.discountRate"
                    label="Discount rate"
                    type="number"
                    suffix="%"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <!-- Bill To & Bill From -->
        <v-row class="py-4">
          <v-col cols="6">
            <h4>Bill to:</h4>
            <v-text-field
              v-model="invoice.billToName"
              label="Who is this invoice to?"
            ></v-text-field>
            <v-text-field
              v-model="invoice.billToEmail"
              label="Email address"
              class="pt-2"
            ></v-text-field>
            <v-text-field
              v-model="invoice.billToAddress"
              label="Billing address"
              class="pt-2"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <h4>Bill from:</h4>
            <v-text-field
              v-model="invoice.billFromName"
              label="Who is this invoice from?"
            ></v-text-field>
            <v-text-field
              v-model="invoice.billFromEmail"
              label="Email address"
              class="pt-2"
            ></v-text-field>
            <v-text-field
              v-model="invoice.billFromAddress"
              label="Billing address"
              class="pt-2"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <!-- Items Section with v-menu for product search -->

        <h4>Items</h4>
        <v-row v-for="(item, index) in invoice.items" :key="index">
          <!-- Item field with v-menu for product search -->
          <v-col cols="2">
            <v-text-field v-model="item.name" @focus="searchProducts(index)">
              <v-menu activator="parent">
                <v-list>
                  <v-list-item
                    v-for="(product, indexProduct) in productStore.products"
                    :key="indexProduct"
                    :value="indexProduct"
                    @click="selectProduct(index, product)"
                  >
                    <v-list-item-title>{{ product.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-text-field>
          </v-col>

          <!-- Description field -->
          <v-col cols="3">
            <v-text-field
              v-model="item.description"
              label="Description"
            ></v-text-field>
          </v-col>

          <!-- Unit Cost -->
          <v-col cols="2">
            <v-text-field
              v-model.number="item.price"
              label="Unit Cost"
              type="number"
            ></v-text-field>
          </v-col>

          <!-- Quantity -->
          <v-col cols="2">
            <v-text-field
              v-model.number="item.qty"
              label="Quantity"
              type="number"
            ></v-text-field>
          </v-col>

          <!-- Line Total -->
          <v-col cols="2">
            <v-text-field
              :model-value="item.qty * item.price"
              label="Line Total"
              readonly
              disabled=""
            ></v-text-field>
          </v-col>

          <!-- Delete item -->
          <v-col cols="1">
            <v-btn
              icon="mdi-delete"
              @click="removeItem(index)"
              variant="text"
              color="error"
            ></v-btn>
          </v-col>
        </v-row>

        <v-btn color="secondary" variant="tonal" class="my-2" @click="addItem">
          Add Item
        </v-btn>

        <v-divider></v-divider>

        <!-- Summary Section -->
        <v-row class="py-4" dense>
          <v-col cols="4" offset="8">
            <h4>Summary</h4>
            <v-row class="pt-2" no-gutters>
              <v-col cols="6">
                <span>Subtotal:</span>
              </v-col>
              <v-col cols="6" class="text-right">
                <span>{{ subtotal }}</span>
              </v-col>
            </v-row>
            <v-row class="pt-2" no-gutters>
              <v-col cols="6"><p>Discount:</p></v-col>
              <v-col cols="6" class="text-right">
                <span> {{ discountAmount }} </span>
              </v-col>
            </v-row>
            <v-row class="pt-2" no-gutters>
              <v-col cols="6"><span>Tax:</span></v-col>
              <v-col cols="6" class="text-right">
                <span>{{ taxAmount }}</span>
              </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-row class="pt-2" no-gutters>
              <v-col cols="6">
                <strong>Total:</strong>
              </v-col>
              <v-col cols="6" class="text-right">
                <strong> {{ finalTotal }} </strong>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="tonal" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" variant="flat" @click="saveInvoice">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product"; // Assuming you have a product store
import { defineEmits } from "vue";

const emit = defineEmits();
const dialog = ref(false);
const formTitle = ref("New Invoice");

const invoiceDate = new Date().toLocaleDateString();
const invoiceNumber =
  "INV-" + Math.random().toString(36).substring(7).toUpperCase();

const invoice = ref({
  invoiceDate: "",
  dueDate: "",
  billToName: "",
  billToEmail: "",
  billToAddress: "",
  billFromName: "",
  billFromEmail: "",
  billFromAddress: "",
  currency: "USD",
  taxRate: 10,
  discountRate: 0,
  items: [
    {
      name: "",
      description: "",
      qty: 1,
      price: 0,
    },
  ],
});

const currencies = ["USD", "EUR", "JPY"];

const addItem = () => {
  invoice.value.items.push({
    name: "",
    description: "",
    qty: 1,
    price: 0,
    menu: false,
  });
};

const removeItem = (index) => {
  invoice.value.items.splice(index, 1);
};

// Compute subtotal of all items
const subtotal = computed(() => {
  return invoice.value.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
});

// Compute discount amount based on subtotal
const discountAmount = computed(() => {
  return (subtotal.value * invoice.value.discountRate) / 100;
});

// Compute tax amount based on subtotal
const taxAmount = computed(() => {
  return (subtotal.value * invoice.value.taxRate) / 100;
});

// Compute the final total considering discount and tax
const finalTotal = computed(() => {
  return subtotal.value - discountAmount.value + taxAmount.value;
});

// Product search logic
const filteredProducts = ref([]);
const productStore = useProductStore(); // Assuming a Pinia store for products

const searchProducts = (itemIndex) => {
  const query = invoice.value.items[itemIndex].name;
  if (query) {
    // Filter the products based on the query entered in the item field
    filteredProducts.value = productStore.products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    // If no products match, display a dummy product option
    if (filteredProducts.value.length === 0) {
      filteredProducts.value = [
        { name: "Dummy Product", description: "No product found", price: 0 },
      ];
    }
  } else {
    filteredProducts.value = [];
  }
};

// Function to select a product and auto-fill item details
const selectProduct = (itemIndex, product) => {
  const selectedItem = invoice.value.items[itemIndex];
  selectedItem.name = product.name;
  selectedItem.description = product.description;
  selectedItem.price = product.price;
  selectedItem.qty = 1; // Default quantity
  selectedItem.menu = false; // Close the v-menu
};

// Function to cancel the dialog and reset the form
const cancel = () => {
  dialog.value = false;
  // Optionally reset the form or keep current state
};

// Function to review the invoice (could navigate to another page or trigger validation)
const saveInvoice = () => {
  // Emit the invoice for further processing
  console.log(invoice.value);
  emit("saveInvoice", invoice.value);
  dialog.value = false;
};
</script>

<style scoped>
/* Add any styles to match the design */
</style>
