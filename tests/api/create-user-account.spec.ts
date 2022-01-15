//COVERAGE_TAG: POST /v1/auth/login

import { test, expect } from "@playwright/test";
import {
  getSchemaFromJson,
  createJsonSchema,
  schemaEqual,
} from "../../lib/validateJsonSchema";

test.describe("/api/createAccount", async () => {
  let username = process.env.USER_NAME;
  let password = process.env.USER_PASSWORD;
  let bodyForm = {
    name: "Testy",
    email: Date.now() + "test@asdf.comx",
    password: password,
    title: "Mr",
    birth_date: "10",
    birth_month: "05",
    birth_year: "1945",
    firstname: "First_Name",
    lastname: "Last_Name",
    company: "Company_Name",
    address1: "100 Address Test",
    address2: "suite 100",
    country: "United States",
    zipcode: "35005",
    state: "Georgia",
    city: "Roswell",
    mobile_number: "1231231231",
  };

  // API Challenge 11: https://www.automationexercise.com/api_list#:~:text=API%2011%3A%20POST%20To%20Create/Register%20User%20Account
  test("POST create an account should be successful", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(baseURL + "/api/createAccount", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: bodyForm,
    });
    const body = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe("User created!");

    //This section does Json Schema Assertions
    let jsonName = "POST_createAccount";
    let path = "api";

    //Comment this command once you have created the schema and saved
    //createJsonSchema(jsonName, path, body);
    let existingSchema = require("../../.api/" +
      path +
      "/" +
      jsonName +
      "_schema.json");
    let responseSchema = getSchemaFromJson(body);
    expect(responseSchema).toEqual(existingSchema);
    schemaEqual(existingSchema, body);
  });

  test("POST create an account that has a email that already exists", async ({
    request,
    baseURL,
  }) => {
    //Replaces random email with an email that already exists set in .env file
    bodyForm.email = username;
    const response = await request.post(baseURL + "/api/createAccount", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: bodyForm,
    });
    const body = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Email already exists!");
  });
});
