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

## Running the Tests in VS Code

* In VSCode use the "View --> Debug Console" menu option, choose "Terminal" and make sure "Javascript Debug Terminal is set as the terminal type.
* Add a breakpoint in your code using the red dot in the left margin.
* Use the `npm run debug` command which starts a debugging session where you can step through and see variables.

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