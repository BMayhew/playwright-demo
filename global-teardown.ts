/*eslint no-empty-function: ["error", { "allow": ["functions"] }]*/

import * as fs from "fs";

async function globalTearDown() {
  //Currently have this wait in check so the /lib/metrics/summaryReporter.ts has time to write the summary.json file for running failures and for metrics
  setTimeout(function () {}, 5000);
}

export default globalTearDown;
