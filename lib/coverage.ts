import { request } from "@playwright/test";
import fs from "fs";
import { execSync } from "child_process";
require("dotenv").config();

let baseURL = process.env.APIURL;

//Gets the latest Spec3 file from environment writes it to lib folder spec3.json for reference
async function fetchOpenApi() {
  const requestContext = await request.newContext();
  const response = await requestContext.get(baseURL + "/docs/spec3.json", {});
  const body = JSON.parse(await response.text());
  //writeFile("./lib/spec3.json", JSON.stringify(body, null, 2));
  return body;
}

//This function will take OpenSpec file and build an array of Coverage Tags and write to a file
function getEndpoints(json: any) {
  let spec3 = json;

  let methods = spec3.paths;
  let finalArray = [];
  for (const property in methods) {
    let verbs = Object.keys(methods[property]);
    for (const verb in verbs) {
      let finalVerb = verbs[verb].toUpperCase();
      let finalPath = property;
      finalArray.push(finalVerb + " " + finalPath);
    }
  }
  //writeFile("./lib/coverage_check.txt", JSON.stringify(finalArray, null, "\t"));
  return finalArray;
}

//Greps local files getting a list of files with specified coverage tag and calculates coverage
function getCoverage(coverageArray: any) {
  let totalEndPoints = coverageArray.length;
  let coveredEndPoints = 0;
  let nonCoveredEndpoints = [];

  //Iterates through the coverageArray to grep each file in the test directory looking for matches
  for (const value in coverageArray) {
    const output = execSync(
      `grep -rl test -e 'COVERAGE_TAG: ${coverageArray[value]}$' | cat`,
      {
        encoding: "utf-8",
      }
    );
    // console.log(value);
    // console.log(coverageArray[value]);
    // console.log(output);
    if (output != "") {
      coveredEndPoints += 1;
    } else {
      nonCoveredEndpoints.push(coverageArray[value]);
    }
  }

  console.log("Total Endpoints: " + totalEndPoints);
  console.log("Covered Endpoints: " + coveredEndPoints);
  // writeFile(
  //   "./lib/non_covered_endpoints.txt",
  //   JSON.stringify(nonCoveredEndpoints, null, "\t")
  // );
  calculateCoverage(coveredEndPoints, totalEndPoints);
}

function calculateCoverage(coveredEndpoints: number, totalEndpoints: number) {
  let percentCovered = ((coveredEndpoints / totalEndpoints) * 100).toFixed(2);
  console.log("Coverage: " + percentCovered + "%");
}

async function writeFile(location: string, data: string) {
  try {
    fs.writeFileSync(location, data);
    // console.log("File written successfully");
    // console.log("The written file has" + " the following contents:");
    // console.log("" + fs.readFileSync(location));
  } catch (err) {
    console.error(err);
  }
}

export { getEndpoints, fetchOpenApi, getCoverage };
