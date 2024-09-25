import { type ThemeDefinition } from "vuetify";

// Define light and dark themes
const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F8F7FA",
    primary: "#9277ff",
    secondary: "#373b53",
    success: "#33d69f",
    warning: "#ff8f00",
    error: "#ED5313",
    info: "#195869",
  },
  variables: {
    "border-color-editor": "#F3F2F1",
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#9277ff",
    secondary: "#FFF",
    success: "#33d69f",
    warning: "#ff8f00",
    error: "#ED5313",
    info: "#28728A",
  },
  variables: {},
};

// Export themes as an object
const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
