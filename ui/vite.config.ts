import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest-setup.js'
    },
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:7070'
        }
    },
    build: {
        outDir: 'build'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});
