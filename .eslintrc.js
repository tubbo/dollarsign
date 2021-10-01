module.exports = {
  parser: "babel-eslint",
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // TODO: Remove after Jest integration
  overrides: [
    {
      files: ["test/**/*"],
      globals: {
        $: true,
        test: true,
      },
    },
  ],
};
