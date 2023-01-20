import fs from "fs";
import path from "path";
import { mergeHTMLReports } from "playwright-merge-html-reports";
import { mergeSummary } from "./mergeSummary";

const reportPathsToMerge = fs
  .readdirSync(process.cwd() + "/playwright-report", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map(({ name }) => path.resolve(process.cwd() + "/playwright-report", name));

// merges html reports and saves to /html-report
mergeHTMLReports(reportPathsToMerge, {
  outputFolderName: "html-report",
});

// merges the summary.json in each report-x folder and saves a summary.json to root directory
mergeSummary(reportPathsToMerge);
