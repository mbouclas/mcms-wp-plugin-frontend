import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';
/** @type {import('@sveltejs/kit').Config} */
/// type: import('@sveltejs/kit').Config

const config = {
  kit: {
    alias: {
      '@components': path.resolve('./src/components'),
      '@layouts': `src/layouts`,
      '@lib': path.resolve('./src/lib'),
    },
    adapter: adapter(),

  },

  preprocess: vitePreprocess()
};
export default config;
