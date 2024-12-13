import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],  // Określenie plików do analizy (rozszerzenia .js, .mjs, .cjs, .jsx)
    languageOptions: {
      globals: {
        console: "readonly",  // Określenie, że "console" jest zmienną globalną (dostępna w przeglądarkach)
        document: "readonly", // Określenie, że "document" jest zmienną globalną (dostępna w przeglądarkach)
      },
    },
  },
  pluginJs.configs.recommended, // Włączenie zalecanych zasad ESLint dla plików JavaScript
];