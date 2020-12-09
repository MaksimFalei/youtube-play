module.exports = {
  moduleFileExtensions: [
    'js',
    'vue',
  ],

  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },

  transformIgnorePatterns: ["/node_modules/(?!vue-awesome)"],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },

  preset: '@vue/cli-plugin-unit-jest/presets/no-babel'
};
