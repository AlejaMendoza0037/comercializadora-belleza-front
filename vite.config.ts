import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El proxy envía todo lo que empiece por /api al backend de Spring Boot (puerto 8080).
// Así el navegador cree que todo viene del mismo origen y no hay errores de CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (ruta) => ruta.replace(/^\/api/, ""),
      },
    },
  },
});
