//COVERAGE_TAG: POST /v1/auth/login

import { test, expect } from "@playwright/test";
import {
  getSchemaFromJson,
  createJsonSchema,
  schemaEqual,
} from "../../lib/validateJsonSchema";

test.describe("/api/deleteAccount", async () => {
  let username = Date.now() + "test@asdf.comx";
  let password = process.env.USER_PASSWORD;
  let bodyForm = {
    name: "Testy",
    email: username,
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
  test.beforeAll(async ({ request, baseURL }) => {
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
  });

  // API Challenge 12: https://www.automationexercise.com/api_list#:~:text=API%2012%3A%20DELETE%20METHOD%20To%20Delete%20User%20Account
  test("DELETE to delete an existing account from the service", async ({
    request,
    baseURL,
  }) => {
    const response = await request.delete(baseURL + "/api/deleteAccount", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: {
        email: username,
        password: password,
      },
    });
    const body = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("Account deleted!");

    //This section does Json Schema Assertions
    let jsonName = "DELETE_deleteAccount";
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
});
