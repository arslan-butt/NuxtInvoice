<template>
  <v-app-bar class="px-3">
    <v-app-bar-title>ARSLAN</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn
      :prepend-icon="
        theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
      text="Toggle Theme"
      slim
      @click="onClick"
    ></v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["update-theme"]);

const theme = ref("light");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
  emit("update-theme", theme.value); // Emit the new theme to the parent
}
</script>
