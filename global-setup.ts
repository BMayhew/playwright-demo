import { chromium, FullConfig, request } from "@playwright/test";
require("dotenv").config();
import { fetchOpenApi, getEndpoints, getCoverage } from "./lib/coverage";

console.log("Loading Globals");

let validUsername = process.env.USER_NAME;
let validPassWord = process.env.USER_PASSWORD;
let baseURL = process.env.APIURL;

async function globalSetup(config: FullConfig) {
  //Do things here
}

console.log("Finished Loading Globals");

export default globalSetup;
