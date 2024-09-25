<template>
  <v-app-bar class="px-3">
    <template v-slot:prepend>
      <v-avatar rounded="0">
        <img height="40" src="/img/icon-green.svg" alt="logo" />
      </v-avatar>
    </template>
    <v-app-bar-title class="ml-0 font-weight-bold text-secondary">
      NuxtInvoice
    </v-app-bar-title>
    <v-spacer></v-spacer>

    <template v-slot:append>
      <div class="d-flex ga-2">
        <ThemeToggle />
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
const emit = defineEmits(["update-theme"]);

const theme = ref("light");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
  emit("update-theme", theme.value); // Emit the new theme to the parent
}
</script>
