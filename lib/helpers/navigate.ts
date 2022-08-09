import { Page } from "@playwright/test";

async function clickAndWait(
  page: Page,
  locator: string,
  expectResponseURL: string
) {
  const [response] = await Promise.all([
    page.waitForResponse(expectResponseURL),
    page.click(locator),
  ]);
  return response;
}

export { clickAndWait };
