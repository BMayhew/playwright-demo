import { request, test } from "@playwright/test";

const CONFIG = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
  user: "",
  pass: "",
  query: "/entries",
};

test("GET test", async () => {
  const context = await request.newContext({
    baseURL: CONFIG.url,
    // httpCredentials: {
    //     username: CONFIG.user,
    //     password: CONFIG.pass
    // },
    extraHTTPHeaders: {
      custom_header: "CP_1",
    },
  });

  const result = await context.get(CONFIG.query, {
    headers: {
      custom_header_2: "CP_2",
    },
  });

  // 'custom_header' should be found here, should it not?!
  console.log(result.headersArray());
});
