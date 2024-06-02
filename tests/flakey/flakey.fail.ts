import { test, expect } from "@playwright/test";

test.describe("Custom Assertions", async () => {
  test("flakey test @unsatisfactory", async ({ request }) => {
    await request.post(`auth/login`, {});

    const randomBoolean = Math.random() > 0.5;
    expect(randomBoolean).toBe(true);
  });

  test("1 flakey test @happy @unsatisfactory", async ({ request }) => {
    await request.post(`auth/login`, {});

    const randomBoolean = Math.random() > 0.5;
    expect(randomBoolean).toBe(true);
  });

  test("2 flakey test @unsatisfactory", async ({ request }) => {
    await request.post(`auth/login`, {});

    const randomBoolean = Math.random() > 0.5;
    expect(randomBoolean).toBe(true);
  });

  test("3 flakey test @unsatisfactory", async ({ request }) => {
    await request.post(`auth/login`, {});

    const randomBoolean = Math.random() > 0.5;
    expect(randomBoolean).toBe(true);
  });

  test("4 flakey test @unsatisfactory", async ({ request }) => {
    await request.post(`auth/login`, {});

    const randomBoolean = Math.random() > 0.5;
    expect(randomBoolean).toBe(true);
  });
});
