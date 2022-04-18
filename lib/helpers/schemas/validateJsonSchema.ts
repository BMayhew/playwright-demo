import {
  getSchemaFromJson,
  createJsonSchema,
  schemaEqual,
} from "./schemaHelperFunctions";
import { expect } from "@playwright/test";

function validateJsonSchema(
  fileName: string,
  filePath: string,
  body: object,
  createSchema: boolean = false
) {
  let jsonName = fileName;
  let path = filePath;

  // creates schema if true is passed
  if (createSchema) {
    createJsonSchema(jsonName, path, body);
  }

  let existingSchema = require("../../../.api/" +
    path +
    "/" +
    jsonName +
    "_schema.json");
  let responseSchema = getSchemaFromJson(body);
  expect(responseSchema).toEqual(existingSchema);
  schemaEqual(existingSchema, body);
}

export { validateJsonSchema };
