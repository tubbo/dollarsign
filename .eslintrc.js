module.exports = {
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:jest/recommended"],
  plugins: ["jest", "jest-dom"],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
