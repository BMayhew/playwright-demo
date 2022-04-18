# Playwright Typescript Demo

I plan to create a playwright-demo repository showing off different features of playwright.

For many of the tests I will be using - <https://www.automationexercise.com/>

## Getting Started

The framework we are using is [Playwright](https://playwright.dev/). If you want a good video to introduce you to Playwright, check out [this video](https://www.youtube.com/watch?v=_Jla6DyuEu4). You can try out playwright in the cloud [here](https://try.playwright.tech/).

For helpful tips checkout <https://playwrightsolutions.com>

## Installation

If you want to run this on your local machine, git clone the repo to local. In the main directory run the below commands. This will install playwright dependencies on your machine.

```bash
npm install
npx playwright install
```

## If you want to start from scratch

You can easily start a project from scratch by running the below command from an empty directory. This will even create the GitHub Actions file for running these tests in the cloud.

```bash
npm init playwright@latest
```

From a new directory run npm init playwright

## Running the automated checks

```bash
npx playwright test
```

## Running the Code Generator

```bash
npx playwright codegen
```

### Running the Tests in VS Code

The Playwright team has released a VS Code Extension that allows you to debug tests easily with the click or right click of a button.

* [Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
* [Video walk through of the features](https://www.youtube.com/watch?v=z0EOFvlf14U)

## Writing Assertions

*[Playwright API Assertions](https://jestjs.io/docs/expect) - docs to the API assertions using Jest

## Json Schema Checks

I use genson-js to generate JSONSchema for schema snapshot testing. <https://github.com/aspecto-io/genson-js>. For most of our API calls we will do a JSON schema check. This can be done with the below lines of code.

```javascript
    //This section does Json Schema Assertions
    let jsonName = "{VERB}_{endpoint_name}";
    let path = "{path}";

    //Comment this command once you have created the schema and saved
    //createJsonSchema(jsonName, path, body);
    let existingSchema = require("../../.api/" +
      path +
      "/" +
      jsonName +
      "_schema.json");
    let responseSchema = getSchemaFromJson(body);
    expect(responseSchema).toEqual(existingSchema);
    schemaEqual(existingSchema, body);
```

## Working with Snapshots (images)

Update current snapshots

```bash
npx playwright test --update-snapshots
```

## Updating Snapshots for CI runs

You will run into scenarios where you will need to add a update a snapshot image. The best way to do this is running the test within a local docker container with the flag --update-snapshots.

If running on a M1 mac, this playwright docker image will work

```bash
docker run --ipc=host --shm-size=1gb --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.17.1-arm64 /bin/bash
```

While at the bash prompt in the docker container you can run this command which will install playwright and all the dependencies and run all the tests and update the snapshots

```bash
npm ci && npx playwright install --with-deps && npx playwright test --update-snapshots
```

## Packages

> Note these packages are automatically installed when running the install commands above

* [@playwright/test](https://www.npmjs.com/package/@playwright/test) | [Playwright Docs](https://playwright.dev/) - allows us to use the playwright test runner along with playwright
* [dotenv](https://www.npmjs.com/package/dotenv) - allows us to use the .env file at the root of the directory to use environment variables
* [genson-js](https://www.npmjs.com/package/genson-js) - used in JSON schema generation and comparison

## Additional Learnings

* [Getting Started with Json Schema](https://json-schema.org/learn/getting-started-step-by-step.html)
* [Understanding Json Schema](https://json-schema.org/understanding-json-schema/index.html)

## Playwright Resources

* [Playwright Docs](https://playwright.dev/docs/intro)
* [Playwright Solutions](https://playwrightsolutions.com/)
* [Awesome-Playwright](https://github.com/mxschmitt/awesome-playwright)
* [25 reasons to choose Playwright as your next web testing framework](https://www.marcusfelling.com/blog/2022/25-reasons-to-choose-playwright-as-your-next-web-testing-framework)
* [Create resilient 🎭 Playwright e2e tests with locators](https://www.marcusfelling.com/blog/2022/create-more-reliable-playwright-tests-with-locators/)
