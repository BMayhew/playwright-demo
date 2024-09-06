import { Page, expect, request } from "@playwright/test";

export async function getAllLinksFromPage(page: Page) {
  // getByRole('link') only matches visible links
  //
  // if you want to check all links, you can use a CSS selector
  // like 'locator("a")'
  const links = page.getByRole("link");

  const allLinks = await links.all();
  const allLinkHrefs = await Promise.all(
    allLinks.map((link) => link.getAttribute("href"))
  );
  const validHrefs = allLinkHrefs.reduce((links, link) => {
    expect.soft(link, "link has no a proper href").not.toBeFalsy();

    if (link && !link?.startsWith("mailto:") && !link?.startsWith("#"))
      links.add(new URL(link, page.url()).href);
    return links;
  }, new Set<string>());

  return validHrefs;
}

export async function checkLinksFromPage(
  linkUrls: Set<string>,
  page: Page,
  test,
  testInfo
) {
  for (const url of linkUrls) {
    await test.step(`Checking link: ${url}`, async () => {
      try {
        // Note that some hosters / firewalls will block plain requests (Cloudflare, etc.)
        // if that's the case for you, consider using `page.goto`
        // or excluding particular URLs from the test
        const response = await page.request.get(url);

        expect
          .soft(response.ok(), `${url} has no green status code`)
          .toBeTruthy();
      } catch (error) {
        expect.soft(null, `${url} has no green status code`).toBe(200);
      }
    });
  }

  testInfo.attach("checked-links.txt", {
    body: Array.from(linkUrls).join("\n"),
  });
}
