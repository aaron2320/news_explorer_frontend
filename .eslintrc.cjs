module.exports = {
  ignorePatterns: ["node_modules/", "dist/"],
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx"],
      },
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": ["error", { ignore: ["^/"] }], // Ignore Vite public paths starting with '/'
    "import/no-absolute-path": "off", // Disable for now to avoid Vite path issues
  },
};
