import { test, expect } from "../../lib/fixtures/hook";

test.describe("Highest Level", () => {
  let x: number;
  x = 1;

  test.beforeAll(() => {
    console.log("--Hello before all tests--");
  });

  test.afterAll(() => {
    console.log("--Hello after all tests--");
  });

  test.afterEach(() => {
    console.log("<<Hello after each test");
  });

  test.beforeEach(() => {
    console.log(">>Hello before each test");
  });

  test.afterAll(() => {
    console.log("Hello after all tests");
  });

  test("One", async ({ page }) => {
    expect(x).toBe(1);
  });

  test("One v2", async ({ page }) => {
    expect(x).toBe(1);
  });

  test("Two", async ({ page }) => {
    expect(x).toBe(1);
  });

  test("Two v2", async ({ page }) => {
    expect(x).toBe(1);
  });
});
