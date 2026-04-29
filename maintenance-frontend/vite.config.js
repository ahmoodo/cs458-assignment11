import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// FIX: Add a proxy so that all /api/* requests made by the React app are
// forwarded to the ASP.NET Core backend. This means App.jsx can use the
// relative path "/api" instead of the hardcoded "https://localhost:7239/api",
// which avoids browser HTTPS certificate errors for the self-signed dev cert.
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5050",
        changeOrigin: true,
      },
    },
  },
});
