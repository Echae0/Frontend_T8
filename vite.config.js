import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8080", // 백엔드 서버 주소
  //       changeOrigin: true,
  //       secure: false, // https가 아닌 http인 경우 필요
  //       // rewrite: (path) => path // '/api'를 유지하므로 생략 가능
  //     },
  //   },
  // },
});
