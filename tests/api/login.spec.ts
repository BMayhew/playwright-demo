//COVERAGE_TAG: POST /api/verifyLogin

import { test, expect } from "@playwright/test";
import { validateJsonSchema } from "../../lib/helpers/schemas/validateJsonSchema";

test.describe("/api/verifyLogin", async () => {
  let username = process.env.USER_NAME;
  let password = process.env.USER_PASSWORD;
  let schemaPath = "api";

  // API Challenge 7: https://www.automationexercise.com/api_list#:~:text=API%207%3A%20POST%20To%20Verify%20Login%20with%20valid%20details
  test("POST with a valid un/pw should be authenticated", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(baseURL + "/api/verifyLogin", {
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
    expect(body.message).toBe("User exists!");

    //This section does Json Schema Assertions
    let jsonName = "POST_login";
    validateJsonSchema(jsonName, schemaPath, body);
  });

  //API Challenge 8: https://www.automationexercise.com/api_list#:~:text=API%208%3A%20POST%20To%20Verify%20Login%20without%20email%20parameter
  test("POST with a missing email should get bad request", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(baseURL + "/api/verifyLogin", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: {
        password: password,
      },
    });
    const body = JSON.parse(await response.text());
    expect(response.status()).toBe(200);

    //NOTE below is the body I am asserting against, it doesn't follow typical response codes
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe(
      "Bad request, email or password parameter is missing in POST request."
    );
  });

  //API Challenge 9: https://www.automationexercise.com/api_list#:~:text=API%209%3A%20DELETE%20To%20Verify%20Login
  test("DELETE method against login endpoint, method doesn't exist", async ({
    request,
    baseURL,
  }) => {
    const response = await request.delete(baseURL + "/api/verifyLogin", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: {
        email: "fake_email@test.com",
        password: password,
      },
    });
    const body = JSON.parse(await response.text());
    expect(response.status()).toBe(200);

    //NOTE below is the body I am asserting against, it doesn't follow typical response codes
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");
  });

  //API Challenge 10: https://www.automationexercise.com/api_list#:~:text=API%2010%3A%20POST%20To%20Verify%20Login%20with%20invalid%20details
  test("POST with a invalid un/pw should get unauthorized", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(baseURL + "/api/verifyLogin", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: {
        email: "fake_email@test.com",
        password: password,
      },
    });
    const body = JSON.parse(await response.text());
    expect(response.status()).toBe(200);

    //NOTE below is the body I am asserting against, it doesn't follow typical response codes
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });
});
