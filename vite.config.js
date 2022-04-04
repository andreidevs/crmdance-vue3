import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: [
      { find: /^~(.*)$/, replacement: '$1' },
      {
        find: /@\/.+/,
        replacement: (val) => {
          return val.replace(/^@/, path.resolve(__dirname, "./src/"));
        },
      }
    ],
  },
})
