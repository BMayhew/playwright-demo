import { request } from "@playwright/test";
let baseURL = process.env.APP_URL;

async function getHealthCheckCode() {
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.get(
    baseURL + "/api/productsList",
    {
      headers: {
        Accept: "*/*",
        ContentType: "application/json",
      },
    }
  );
  return response.status();
}

export { getHealthCheckCode };
