//COVERAGE_TAG: POST /v1/auth/login

import { test, expect } from "@playwright/test";
import {
  getSchemaFromJson,
  createJsonSchema,
  schemaEqual,
} from "../../lib/validateJsonSchema";

test.describe("/api/verifyLogin", async () => {
  let username = process.env.USER_NAME;
  let password = process.env.USER_PASSWORD;

  test("POST with a valid username and password should be authenticated", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(baseURL + "/api/verifyLogin", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: {
        email: "TestyMctester@test.comx",
        password: "P@$$w0rD",
      },
    });
    const body = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");

    //This section does Json Schema Assertions
    let jsonName = "POST_login";
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
