# Playwright Typescript Demo

I plan to create a playwright-demo repository showing off different features of playwright.

For many of the tests I will be using - <https://www.automationexercise.com/>

## Installation

If you want to run this on your local machine, git clone the repo to local. In the main directory run the below commands. This will install playwright dependencies on your machine.

```bash
npm install
npx playwright install
```

## Running the automated checks

```bash
npx playwright test
```

## Packages

> Note these packages are automatically installed when running the install commands\

* [@playwright/test](https://www.npmjs.com/package/@playwright/test) | [Playwright Docs](https://playwright.dev/) - allows us to use the playwright test runner along with playwright
* [dotenv](https://www.npmjs.com/package/dotenv) - allows us to use the .env file at the root of the directory to use environment variables
