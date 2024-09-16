// jest.config.cjs
module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom", // Ensure this is correct
  moduleFileExtensions: ["js", "jsx"],
};
