<template>
  <div>
    <v-app :theme="theme">
      <core-app-header @update-theme="updateTheme" />
      <core-view>
        <NuxtPage />
      </core-view>
    </v-app>
  </div>
</template>
<script setup>
import CoreAppHeader from "@/components/core/AppHeader.vue";
import CoreView from "@/components/core/View.vue";

import { ref } from "vue";

const theme = ref("light");

// Update the theme when the child emits the update-theme event
function updateTheme(newTheme) {
  theme.value = newTheme;
}
</script>
