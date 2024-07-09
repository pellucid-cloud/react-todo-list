import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    plugins: [react()],
    build: {
      outDir: './build'
    },
    resolve: {
      alias: {
        '@': `${__dirname}/src`,
      }
    },
    define: {
      DotEnv: env
    }
  }
})
