import {defineConfig} from 'cypress';

export default defineConfig({
  projectId: 'n3os69',
  e2e: {
    baseUrl: 'http://localhost:5173/',
  },
});
