import fs from "fs";
import path from "path";
const { mergeHTMLReports } = require("playwright-merge-html-reports");

// mergeHTMLReports(
//   [
//     path.resolve(process.cwd(), "./playwright-report-1_5"),
//     path.resolve(process.cwd(), "./playwright-report-2_5"),
//     path.resolve(process.cwd(), "./playwright-report-3_5"),
//     path.resolve(process.cwd(), "./playwright-report-4_5"),
//     path.resolve(process.cwd(), "./playwright-report-5_5"),
//   ],
//   { outputFolderName: "./test-merge-report-demo" }
// );

// console.log(
//   fs
//     .readdirSync(process.cwd() + "/playwright-report", { withFileTypes: true })
//     .filter((item) => item.isDirectory())
//     .map(({ name }) => path.resolve(process.cwd() + "/playwright-report", name))
// );

const reportPathsToMerge = fs
  .readdirSync(process.cwd() + "/playwright-report", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map(({ name }) => path.resolve(process.cwd() + "/playwright-report", name));

mergeHTMLReports(reportPathsToMerge, {
  outputFolderName: "html-report",
});
