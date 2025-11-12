import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // 🔹 Custom plugin to copy Firebase service worker to /dist
      name: "copy-sw",
      writeBundle() {
        try {
          copyFileSync(
            "src/firebase/firebase-messaging-sw.js",
            "dist/firebase-messaging-sw.js"
          );
          console.log("✅ Firebase Service Worker copied to /dist");
        } catch (err) {
          console.error("⚠️ Failed to copy Firebase Service Worker:", err);
        }
      },
    },
  ],
});
