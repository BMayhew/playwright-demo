import * as fs from "fs";
import * as path from "path";

// Define the source and destination directory paths
const sourceDirectory: string = path.join(__dirname, "blob-report");
const destinationDirectory: string = path.join(__dirname, "all-blob-reports");

// Check for the 'clean' argument
const args = process.argv.slice(2);
const clean = args.includes("clean");

if (clean) {
  // Remove all files from the destination directory
  fs.readdir(destinationDirectory, (err, files) => {
    if (err) {
      console.error("Error reading destination directory:", err);
      process.exit(1);
    }

    files.forEach((file) => {
      const filePath = path.join(destinationDirectory, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${file}:`, err);
        } else {
          console.log(`Deleted ${file} from ${destinationDirectory}`);
        }
      });
    });
  });
} else {
  // Ensure the destination directory exists
  fs.mkdir(destinationDirectory, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating destination directory:", err);
      process.exit(1);
    }

    // Read the source directory
    fs.readdir(sourceDirectory, (err, files) => {
      if (err) {
        console.error("Error reading source directory:", err);
        process.exit(1);
      }

      // Filter files that match the pattern report.*.zip
      const reportFiles = files.filter((file) => /^report.*\.zip$/.test(file));

      // Copy each matching file to the destination directory
      reportFiles.forEach((file) => {
        const sourceFilePath = path.join(sourceDirectory, file);
        const destinationFilePath = path.join(destinationDirectory, file);

        fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
          if (err) {
            console.error(`Error copying file ${file}:`, err);
          } else {
            console.log(`Copied ${file} to ${destinationDirectory}`);
          }
        });
      });
    });
  });
}
