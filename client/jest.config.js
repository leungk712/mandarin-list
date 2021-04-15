module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  collectCoverage: true,
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    ".*\\.(vue)$": "vue-jest"
  },
  "moduleNameMapper": {
    "/^@\/(.*)$/": "C:\Users\leung\Documents\Coding Projects\Vue.js\Vue-Projects\mandarin-list\client\src\$1"
  },
  "resolver": null
};
