import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// FIX: Add a proxy so that all /api/* requests made by the React app are
// forwarded to the ASP.NET Core backend. This means App.jsx can use the
// relative path "/api" instead of the hardcoded "https://localhost:7239/api",
// which avoids browser HTTPS certificate errors for the self-signed dev cert.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7239",
        changeOrigin: true,
        // Allow the self-signed certificate the ASP.NET Core dev server uses.
        secure: false,
      },
    },
  },
});
