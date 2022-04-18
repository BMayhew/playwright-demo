//COVERAGE_TAG: DELETE /api/deleteAccount

import { test, expect } from "@playwright/test";
import { validateJsonSchema } from "../../lib/helpers/schemas/validateJsonSchema";

test.describe("/api/deleteAccount", async () => {
  let username =
    Date.now() + (Math.floor(Math.random() * 90000) + 10000) + "test@asdf.comx";
  let password = process.env.USER_PASSWORD;
  let schemaPath = "api";
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
    //NOTE I could bring in the lib/datafactory/user fixture and call createUser and replace the above code in before all.
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
    validateJsonSchema(jsonName, schemaPath, body);

    //Validate that when POSTING to verifyLogin as the deleted user, the user is not found
    const loginResponse = await request.post(baseURL + "/api/verifyLogin", {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: {
        email: username,
        password: password,
      },
    });
    const loginBody = JSON.parse(await loginResponse.text());
    expect(response.status()).toBe(200);
    expect(loginBody.responseCode).toBe(404);
    expect(loginBody.message).toBe("User not found!");
  });
});
