module.exports = {
  roots: ["<rootDir>", "./"],
  modulePaths: ['<rootDir>'],
  testMatch: ['**/src/test/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
