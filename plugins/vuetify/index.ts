// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import defaults from "./defaults";
import themes from "./themes";

export default defineNuxtPlugin((app) => {
  const cookieTheme = useCookieTheme();
  const vuetify = createVuetify({
    defaults,
    theme: {
      defaultTheme:
        cookieTheme.value && cookieTheme.value !== "system"
          ? cookieTheme.value
          : "light",
      themes,
    },
  });
  app.vueApp.use(vuetify);
});
