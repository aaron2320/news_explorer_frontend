import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { readdirSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Copy assets from public to src/assets (only if directory exists)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicImagesDir = join(__dirname, "public/assets/images");
const srcAssetsDir = join(__dirname, "src/assets");

// Create src/assets directory if it doesn't exist
if (!existsSync(srcAssetsDir)) {
  mkdirSync(srcAssetsDir, { recursive: true });
}

// Copy image files only if public/assets/images exists
if (existsSync(publicImagesDir)) {
  try {
    const files = readdirSync(publicImagesDir);
    files.forEach((file) => {
      const srcPath = join(publicImagesDir, file);
      const destPath = join(srcAssetsDir, file);
      copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to src/assets`);
    });
  } catch (error) {
    console.error("Error copying assets:", error);
  }
}

export default defineConfig({
  plugins: [react()],
  base: "/news_explorer_frontend/", // Already correctly set
  server: {
    port: 3000,
  },
  build: {
    assetsInlineLimit: 0,
    outDir: "dist",
    emptyOutDir: true,
    rollrollOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  publicDir: "public",
});
