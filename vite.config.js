import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                scss: resolve(__dirname, "scss.html")
            }
        }
    },
    plugins: [
        ViteImageOptimizer({
            webp: {
                quality: 75
            },
            jpg: {
                quality: 75
            }
        })
    ]
});