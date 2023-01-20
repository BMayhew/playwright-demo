import path from "path";
import { test, expect } from "@playwright/test";
import { mergeHTMLReports } from "playwright-merge-html-reports";

mergeHTMLReports(
  [
    path.resolve(process.cwd(), "./playwright-report-1_5"),
    path.resolve(process.cwd(), "./playwright-report-2_5"),
    path.resolve(process.cwd(), "./playwright-report-3_5"),
    path.resolve(process.cwd(), "./playwright-report-4_5"),
    path.resolve(process.cwd(), "./playwright-report-_5"),
  ],
  { outputFolderName: "./test-merge-report-demo" }
);

// test("Merge Reports", async () => {
//   mergeHTMLReports;
//   expect(1).toBe(1);
// });
