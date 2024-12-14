const fs = require("fs");
const path = require("path");
const prettierConfig = require("./.prettierrc.cjs");

const getAllDirs = (dir) => {
  const directoryPath = path.join(__dirname, dir);
  const files = fs.readdirSync(directoryPath);
  return files.map((value) => value.split(".")[0]);
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ["react", 'react-refresh'],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            // prints 'dir,dir/**' for each dir
            pattern: `{${getAllDirs("src").join(",")},${getAllDirs("src")
              .map((dir) => `${dir}/**`)
              .join(",")}}`,
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
      },
    ],
    // Fail if the file does not follow the Prettier formatting rules.
    // Uses the framework's prettier config.
    // https://github.com/prettier/eslint-plugin-prettier
    "prettier/prettier": ["error", prettierConfig],
    // This rule checks all JSX components and verifies that all props are
    // sorted alphabetically. A spread attribute resets the verification.
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: false,
        shorthandLast: false,
      },
    ],
  }
}
