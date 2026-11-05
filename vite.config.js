import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const API_TARGET = 'http://api.favorit-parts.ru';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: API_TARGET,
          changeOrigin: true,
          rewrite: (requestPath) => {
            const { search } = new URL(requestPath, API_TARGET);
            const params = new URLSearchParams(search);
            params.set('key', env.FAVORIT_API_KEY ?? '');
            return `/hs/hsprice/?${params.toString()}`;
          },
        },
      },
    },
  };
});
