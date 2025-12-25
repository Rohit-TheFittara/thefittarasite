const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");
const src = path.join(repoRoot, "staticwebapp.config.json");
const destDir = path.join(repoRoot, ".next");
const dest = path.join(destDir, "staticwebapp.config.json");

if (!fs.existsSync(src)) {
  console.warn("staticwebapp.config.json not found; skipping copy.");
  process.exit(0);
}

if (!fs.existsSync(destDir)) {
  console.warn(".next output folder not found; skipping copy.");
  process.exit(0);
}

fs.copyFileSync(src, dest);
console.log("Copied staticwebapp.config.json to .next.");
