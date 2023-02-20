/*eslint no-empty-function: ["error", { "allow": ["functions"] }]*/

async function globalTearDown() {
  setTimeout(function () {}, 5000);
}

export default globalTearDown;
