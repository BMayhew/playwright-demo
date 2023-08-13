import fs from "fs";
import path from "path";
// import { mergeHTMLReports } from "playwright-merge-html-reports";
import { mergeSummary } from "playwright-merge-summary-json-reports";

const reportPathsToMerge = fs
  .readdirSync(process.cwd() + "/playwright-report", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map(({ name }) => path.resolve(process.cwd() + "/playwright-report", name));

async function runReport(paths: string[]) {
  // merges the summary.json in each report-x folder and saves a summary.json to root directory
  await mergeSummary(paths);

  // merges html reports and saves to /html-report
  // await mergeHTMLReports(paths, {
  //   outputFolderName: "html-report",
  // });
}

runReport(reportPathsToMerge);
