module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    // Needed to make the parser take into account 'vue' files
    extraFileExtensions: [".vue"],
    // ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaVersion: "latest",
  },

  env: {
    browser: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    "eslint:recommended",

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    "plugin:vue/vue3-essential", // Priority A: Essential (Error Prevention)
    "plugin:vue/vue3-strongly-recommended", // Priority B: Strongly Recommended (Improving Readability)
    "plugin:vue/vue3-recommended", // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
  ],

  plugins: [
    // required to apply rules which need type information
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    "vue",
  ],

  globals: {
    process: "readonly",
    chrome: "readonly",
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
  },

  // add your custom rules here
  rules: {
    "prefer-promise-reject-errors": "off",
    "no-tabs": "error",
    "vue/script-setup-uses-vars": 2,
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/multi-word-component-names": [
      "off",
      {
        ignores: [],
      },
    ],
    "vue/no-v-html": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "no-param-reassign": "off",
    "func-names": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [".*"],
      },
    ],
  },
};
