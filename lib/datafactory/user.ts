//https://playwright.dev/docs/test-fixtures - Learn about Fixtures

import { expect, request } from "@playwright/test";

let baseURL = process.env.APP_URL;
let username =
  Date.now() + (Math.floor(Math.random() * 90000) + 10000) + "test@asdf.comx";
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

async function createUser() {
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(
    baseURL + "/api/createAccount",
    {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: bodyForm,
    }
  );

  const body = JSON.parse(await response.text());
  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe("User created!");
  // console.log(username); //useful for debugging locally
  return username;
}

async function deleteUser(existingUserName: string) {
  const deleteRequestContext = await request.newContext();
  const response = await deleteRequestContext.delete(
    baseURL + "/api/deleteAccount",
    {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
      form: {
        email: existingUserName,
        password: password,
      },
    }
  );
  const body = JSON.parse(await response.text());
  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe("Account deleted!");
}

export { createUser, deleteUser };
