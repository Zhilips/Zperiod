import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Proxy all /api/chem requests to the chemistry API server
      '/api/chem': {
        target: 'http://10.0.0.149:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chem/, ''),
      },
    },
  },
});
