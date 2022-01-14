import { createSchema, areSchemasEqual } from "genson-js";
import fs from "fs";

function getSchemaFromJson(json: object) {
  let schemaObj = createSchema(json);
  return schemaObj;
}

async function createJsonSchema(name: string, path: string, json: object) {
  console.log(
    "This is the body that's being converted to json\n" +
      JSON.stringify(json, null, 2)
  );
  //Create any folders that don't exist yet
  let filePath = "./.api/" + path;
  let responseName = ".api/" + path + "/" + name + "_response.json";
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  //Takes Json Body string and saves to file under .api/{endpoint}/{name}.json
  let jsonString: string = JSON.stringify(json);

  //Uncomment this line if you want to save a response.json file
  //writeJsonFile(responseName, jsonString);

  //Takes Json Body string and saves Json Schema snapshot
  let schema = createSchema(json);
  let schemaString: string = JSON.stringify(schema);
  let schemaName = ".api/" + path + "/" + name + "_schema.json";

  writeJsonFile(schemaName, schemaString);
}

async function writeJsonFile(location: string, data: string) {
  try {
    fs.writeFileSync(location, data);
    // console.log("File written successfully");
    // console.log("The written file has" + " the following contents:");
    // console.log("" + fs.readFileSync(location));
  } catch (err) {
    console.error(err);
  }
}

function schemaEqual(schema: any, target: any) {
  areSchemasEqual(schema, target, { ignoreRequired: false });
}

export { getSchemaFromJson, createJsonSchema, schemaEqual };
