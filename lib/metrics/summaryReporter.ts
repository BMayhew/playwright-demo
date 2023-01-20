import * as fs from "fs";
import {
  TestCase,
  TestResult,
  Reporter,
  FullResult,
} from "@playwright/test/reporter";

export interface Summary {
  durationInMS: number;
  passed: string[];
  skipped: string[];
  failed: string[];
  warned: string[];
  timedOut: string[];
  status: FullResult["status"] | "unknown" | "warned" | "skipped";
}

class SummaryReporter implements Reporter, Summary {
  durationInMS = -1;
  passed: string[] = [];
  skipped: string[] = [];
  failed: string[] = [];
  warned: string[] = [];
  timedOut: string[] = [];

  status: Summary["status"] = "unknown";
  startedAt = 0;

  onBegin() {
    this.startedAt = Date.now();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const title = [];
    const fileName = [];
    let clean = true;
    for (const s of test.titlePath()) {
      if (s === "" && clean) continue;
      clean = false;
      title.push(s);
      if (s.includes("spec.ts")) {
        fileName.push(s);
      }
    }

    // This will publish the file name + line number test begins on
    const z = `${fileName[0]}:${test.location.line}:${test.location.column}`;

    // Using the t variable in the push will push a full test test name + test description
    const t = title.join(" > ");

    const status =
      !["passed", "skipped"].includes(result.status) && t.includes("@warn")
        ? "warned"
        : result.status;
    this[status].push(z);
  }

  onEnd(result: FullResult) {
    this.durationInMS = Date.now() - this.startedAt;
    this.status = result.status;

    // removing duplicate tests from passed array
    this.passed = this.passed.filter((element, index) => {
      return this.passed.indexOf(element) === index;
    });

    // removing duplicate and flakey (passed on a retry) tests from the failed array
    this.failed = this.failed.filter((element, index) => {
      if (!this.passed.includes(element))
        return this.failed.indexOf(element) === index;
    });

    fs.writeFileSync(
      `./playwright-report/summary${process.env.SHARD || ""}.json`,
      JSON.stringify(this, null, "  ")
    );
  }
}

export default SummaryReporter;
