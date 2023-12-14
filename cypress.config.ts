import {defineConfig} from 'cypress';

export default defineConfig({
  projectId: 'n3os69',
  fixturesFolder: 'e2e/fixtures',
  e2e: {
    env: {
      API_BASE_URL: 'https://api.top90.io',
    },
    baseUrl: 'http://localhost:5173',
    supportFile: 'e2e/e2e.ts',
    specPattern: 'e2e/*.cy.{ts,tsx}',
    screenshotOnRunFailure: false,
  },
});
