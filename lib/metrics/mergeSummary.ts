import fs from "fs";

async function mergeSummary(directories: string[]) {
  let combined = {
    durationInMS: 0,
    passed: [],
    skipped: [],
    failed: [],
    warned: [],
    timedOut: [],
    status: "passed",
    startedAt: Number.MAX_SAFE_INTEGER,
  };

  directories.forEach((directory) => {
    let summaryPath = directory + "/summary.json";

    try {
      let json = require(summaryPath);
      combined.durationInMS += json.durationInMS;
      combined.passed = combined.passed.concat(json.passed);
      combined.skipped = combined.skipped.concat(json.skipped);
      combined.failed = combined.failed.concat(json.failed);
      combined.warned = combined.warned.concat(json.warned);
      combined.timedOut = combined.timedOut.concat(json.timedOut);
      combined.status = json.status === "failed" ? "failed" : combined.status;
      combined.startedAt =
        json.startedAt < combined.startedAt
          ? json.startedAt
          : combined.startedAt;
    } catch (err) {}
  });

  let newJsonPath = "./summary.json";
  fs.writeFileSync(newJsonPath, JSON.stringify(combined, null, "  "));
  console.log(`Successfully merged ${directories.length} summary.json files`);
  return combined;
}

export { mergeSummary };
