import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Your custom build settings (these are great)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
  
  // base: '/',

  // // Add this server section for local development
  // server: {
  //   proxy: {
  //     // This forwards any requests from your frontend to /api/...
  //     // to your backend server running on http://localhost:5000
  //     '/api': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //     },
  //   }
  // }
});