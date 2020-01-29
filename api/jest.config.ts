export default {
  testPathIgnorePatterns: [
      "/node_modules/",
      "/vendor"
  ],
  setupFiles: ['./tests/unit/setup.ts'],
  testMatch: ['**/tests/unit/*.ts'],
}