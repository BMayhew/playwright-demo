// created some locators need to build out the logic
// inspiration - https://dev.to/mintzworld/solving-the-wordle-game-using-python-and-selenium-1aei

// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.locator('html').click();
//   await page.locator('[data-testid="Play"]').click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: 'a', exact: true }).click();
//   await page.getByRole('button', { name: 's', exact: true }).click();
//   await page.getByRole('button', { name: 'd', exact: true }).click();
//   await page.getByRole('button', { name: 'f', exact: true }).click();
//   await page.getByRole('button', { name: 'g', exact: true }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'w' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click({
//     clickCount: 5
//   });
//   await page.getByRole('button', { name: 't', exact: true }).click();
//   await page.getByRole('button', { name: 'a', exact: true }).click();
//   await page.getByRole('button', { name: 'p', exact: true }).click();
//   await page.getByRole('button', { name: 'e', exact: true }).click();
//   await page.getByRole('button', { name: 'r', exact: true }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('img', { name: 't present' }).click();
//   await page.getByRole('img', { name: 'a absent' }).click();
//   await page.getByRole('img', { name: 'p absent' }).click();
//   await page.getByRole('img', { name: 'e correct' }).click();
//   await page.getByRole('img', { name: 'r absent' }).click();
//   await page.getByRole('group', { name: 'Row 2' }).locator('[data-testid="tile"]').first().click();
//   await page.getByRole('group', { name: 'Row 3' }).locator('[data-testid="tile"]').first().click();
//   await page.getByRole('group', { name: 'Row 4' }).locator('[data-testid="tile"]').first().click();
//   await page.getByRole('group', { name: 'Row 5' }).locator('[data-testid="tile"]').first().click();
//   await page.getByRole('group', { name: 'Row 6' }).locator('[data-testid="tile"]').first().click();
//   await page.getByRole('button', { name: 'w' }).click();
//   await page.getByRole('button', { name: 'i', exact: true }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 's', exact: true }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'm', exact: true }).click();
//   await page.getByRole('button', { name: 'o', exact: true }).click();
//   await page.getByRole('button', { name: 'n', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'y', exact: true }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'd', exact: true }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 'd', exact: true }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'g', exact: true }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'l', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('img', { name: 'e', exact: true }).click();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'h', exact: true }).click();
//   await page.getByText('qwertyuiop').click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'l', exact: true }).click();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'b', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'b', exact: true }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'b', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click({
//     clickCount: 3
//   });
//   await page.getByRole('button', { name: 'b', exact: true }).click();
//   await page.getByRole('button', { name: 'u', exact: true }).click();
//   await page.getByRole('button', { name: 'z' }).click();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'b', exact: true }).click();
//   await page.getByRole('button', { name: 'u', exact: true }).click();
//   await page.getByRole('button', { name: 'c', exact: true }).click();
//   await page.getByRole('button', { name: 'k', exact: true }).click();
//   await page.getByRole('button', { name: 's absent' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'c present' }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'h', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click({
//     clickCount: 3
//   });
//   await page.getByRole('button', { name: 'c present' }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'l', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click({
//     clickCount: 3
//   });
//   await page.getByRole('button', { name: 'c present' }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'g', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).click({
//     clickCount: 3
//   });
//   await page.getByRole('button', { name: 'c present' }).click();
//   await page.getByRole('button', { name: 'o correct' }).click();
//   await page.getByRole('button', { name: 'f', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'j' }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.getByRole('button', { name: 'backspace' }).dblclick();
//   await page.getByRole('button', { name: 'backspace' }).click();
//   await page.getByRole('button', { name: 'v', exact: true }).click();
//   await page.getByRole('button', { name: 'e correct' }).click();
//   await page.getByRole('button', { name: 't present' }).click();
//   await page.getByRole('button', { name: 'enter' }).click();
//   await page.locator('[data-testid="authContainer"]').click();
//   await page.getByText('Played').click();
//   await page.getByText('1', { exact: true }).first().click();
// });
