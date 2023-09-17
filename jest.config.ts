const nextJest = require('next/jest.js');
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
}
 
module.exports =  createJestConfig(config)