import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { manualChunksPlugin } from "vite-plugin-webpackchunkname";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), manualChunksPlugin],
  server: {
    proxy: {
      // "/api"로 시작하는 요청 경로에 타겟 백엔드 서버의 Protocol + Host + Port를 자동 주입함
      // ex) /api/todolist/gdhong => https://todosvc.vercel.app/todolist/gdhong
      "/api": {
        target: "https://todosvc.vercel.app",
        // target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
