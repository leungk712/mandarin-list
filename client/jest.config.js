module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  jest: {
    "collectCoverage": true,
    "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"],
    "moduleFileExtensions": [
      "js",
      "ts",
      "json",
      "vue"
    ],
    "transform": {
      ".*\\.(vue)$": "vue-jest"
    }
  }
};
