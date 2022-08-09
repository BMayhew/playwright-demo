import { FullConfig } from "@playwright/test";
import dotenv from "dotenv";
import { getHealthCheckCode } from "./lib/datafactory/healthcheck";

dotenv.config();

console.log("Loading Globals");

let validUsername = process.env.USER_NAME;
let validPassWord = process.env.USER_PASSWORD;
let baseURL = process.env.APIURL;

async function globalSetup(config: FullConfig) {
  let healthCheckResponse = 0;

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const forLoop = async () => {
    for (let counter = 0; counter < 20; counter++) {
      healthCheckResponse = await getHealthCheckCode();
      if (healthCheckResponse == 200) {
        counter = 20;
        console.log("\x1b[33m%s\x1b[0m", "ENVIRONMENT IS READY");
      } else {
        console.log("Response Code: " + healthCheckResponse);
        console.log("Iteration: " + counter);
        console.log("\x1b[33m%s\x1b[0m", "ENVIRONMENT ISN'T READY");
        await sleep(5000);
      }
    }
  };
  await forLoop();

  console.log("Finished Loading Globals");
}

export default globalSetup;
