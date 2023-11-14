/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 * 
 */


/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js, jsx}"],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
};

module.exports = config;
