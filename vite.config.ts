import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_CLIENT_ID: process.env.REACT_APP_CLIENT_ID
  },
})