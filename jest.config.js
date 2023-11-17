module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ["/node_modules/(?!axios)"],
  setupFilesAfterEnv: ['<rootDir>/tests/router-mock-setup.js'],
}
