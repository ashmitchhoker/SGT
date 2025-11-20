import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get repo name from environment variable
// For GitHub Pages, if repo is 'username/cyber-ethics-game', base should be '/cyber-ethics-game/'
const getBasePath = () => {
  if (process.env.REPO_NAME) {
    const repoName = process.env.REPO_NAME.split('/')[1];
    return `/${repoName}/`;
  }
  // Default: you can change this to your repo name or use '/' for root domain
  return '/';
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' 
    ? getBasePath()
    : '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
