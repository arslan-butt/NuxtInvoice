<template>
  <v-menu min-width="150" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn size="36" v-bind="props">
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>
    </template>

    <v-list color="primary" nav>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :active="cookieTheme === item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        slim
        @click="setTheme(item.value)"
      />
    </v-list>
  </v-menu>
</template>

<script setup>
import { useTheme } from "vuetify";
import { ref, computed } from "vue";

// Assuming you have a method to manage theme preferences with cookies
const cookieTheme = useCookieTheme();

const theme = useTheme();

const items = [
  { title: "System", value: "system", icon: "mdi-laptop" },
  { title: "Light", value: "light", icon: "mdi-white-balance-sunny" },
  { title: "Dark", value: "dark", icon: "mdi-weather-night" },
];

// Initialize the selected theme from cookie or default to 'system'
const selectedTheme = ref(cookieTheme.value || theme.global.name.value);
// const systemMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

onMounted(() => {
  updateThemePreference();

  // Watch for changes in the color scheme preference
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", updateThemePreference);
});

function updateThemePreference(event) {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (selectedTheme.value === "system") {
    theme.global.name.value = prefersDarkScheme ? "dark" : "light";
    cookieTheme.value = selectedTheme.value;
  } else {
    theme.global.name.value = cookieTheme.value;
    selectedTheme.value = cookieTheme.value;
  }
}

function setTheme(themeValue) {
  selectedTheme.value = themeValue;
  if (themeValue == "system") {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    theme.global.name.value = prefersDarkScheme ? "dark" : "light";
  } else {
    theme.global.name.value = themeValue;
  }

  cookieTheme.value = themeValue;
}

// Dynamically compute the icon based on the selected theme
const themeIcon = computed(() => {
  const selectedThemeItem = items.find(
    (item) => item.value === selectedTheme.value
  );
  return selectedThemeItem ? selectedThemeItem.icon : "mdi-laptop";
});
</script>
