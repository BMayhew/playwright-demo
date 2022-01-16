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

### Working with Snapshots (images)

Update current snapshots

```bash
npx playwright test --update-snapshots
```

### Updating Snapshots for CI runs

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

### Additional Learnings

* [Getting Started with Json Schema](https://json-schema.org/learn/getting-started-step-by-step.html)
* [Understanding Json Schema](https://json-schema.org/understanding-json-schema/index.html)