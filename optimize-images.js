import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the assets directory
const assetsDir = path.join(__dirname, "src", "assets");
const outputBaseDir = path.join(__dirname, "optimized-assets");

// Function to optimize an image
async function optimizeImage(filePath) {
  const fileExt = path.extname(filePath).toLowerCase();

  // Skip if not an image file
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(fileExt)) {
    return;
  }

  const relativePath = path.relative(assetsDir, filePath);
  const outputPath = path.join(outputBaseDir, relativePath);
  const outputDir = path.dirname(outputPath);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Get original file size
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    let pipeline = sharp(filePath);

    // Apply different optimization strategies based on file type
    if ([".jpg", ".jpeg"].includes(fileExt)) {
      pipeline = pipeline.jpeg({
        quality: 85,
        mozjpeg: true,
        chromaSubsampling: "4:4:4", // Better quality for photos
      });
    } else if (fileExt === ".png") {
      pipeline = pipeline.png({
        quality: 80,
        compressionLevel: 9,
        palette: true, // Use palette-based optimization
      });
    }

    await pipeline.toFile(outputPath);

    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;

    // Calculate size reduction
    const reduction = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(2);

    console.log(
      `Optimized ${relativePath}: ${(originalSize / 1024).toFixed(1)}KB → ${(
        optimizedSize / 1024
      ).toFixed(1)}KB (${reduction}% reduction)`
    );

    // If optimization was successful (reduced size), replace the original file
    if (optimizedSize < originalSize) {
      fs.copyFileSync(outputPath, filePath);
      console.log(
        `Replaced original file with optimized version: ${relativePath}`
      );
    } else {
      console.log(
        `Keeping original file (optimization didn't reduce size): ${relativePath}`
      );
    }
  } catch (error) {
    console.error(`Error optimizing ${relativePath}:`, error);
  }
}

// Function to process all files in a directory
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory() && file !== "optimized") {
      await processDirectory(filePath);
    } else if (!stats.isDirectory()) {
      await optimizeImage(filePath);
    }
  }
}

// Start processing
console.log("Starting image optimization for all assets...");
processDirectory(assetsDir)
  .then(() => {
    console.log("Image optimization complete!");
    // Clean up the temporary directory
    if (fs.existsSync(outputBaseDir)) {
      fs.rmSync(outputBaseDir, { recursive: true });
      console.log("Cleaned up temporary files");
    }
  })
  .catch((err) => {
    console.error("Error during optimization:", err);
  });
