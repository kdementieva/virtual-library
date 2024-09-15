import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const env = loadEnv('development', process.cwd())
const sslCertFile = env.VITE_SSL_CRT_FILE;
const sslKeyFile = env.VITE_SSL_KEY_FILE;

export default defineConfig({
  plugins: [react()],
  server: {
    https: env.VITE_HTTPS && sslCertFile && sslKeyFile
      ? {
          key: fs.readFileSync(path.resolve(sslKeyFile)),
          cert: fs.readFileSync(path.resolve(sslCertFile)),
        }
      : false,
    port: env.VITE_PORT ? Number(env.VITE_PORT) : 5173,
    proxy: {
      '^/api/.*': {
        target: 'https://localhost:7291',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});