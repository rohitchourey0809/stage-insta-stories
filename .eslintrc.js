// .eslintrc.js
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};

// // .prettierrc
// {
//   "singleQuote": true,
//   "semi": false
// }
