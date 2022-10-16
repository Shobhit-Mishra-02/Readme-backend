import app from "../app";
import request from "supertest";
import tempConnector from "../templates/tempConnector";
import fs from "fs";

// write your test here...

describe("Testing the app", () => {
  // testing the /healthCheck route
  test("GET /healthCheck", async () => {
    const res = await request(app).get("/healthCheck");

    expect(res.text).toEqual("ok");
  });

  /* 
  Testing the GET / route which gives all the templates
  
  1. testing for the templates file name which are in templtes/ and which the api is giving.
  2. testing data in tempConnector and api response
  */

  test("GET / Testing templates in templates folder and templates from API.", async () => {
    const res = await request(app).get("/");
    const APIResponse: { file: string; fileData: string; fileName: string }[] =
      res.body;
    const allFilesInTemplate = fs
      .readdirSync("./templates")
      .filter((fileName) => fileName != "tempConnector.ts");

    const allFilesFromResponse = APIResponse.map((template) => {
      return template.fileName;
    });

    // 1. Testing templates in templates folder and templates from API.
    expect(allFilesInTemplate).toEqual(allFilesFromResponse);
  });

  test("GET / Testing data from tempConnector and api response.", async () => {
    const res = await request(app).get("/");
    const APIResponse: { file: string; fileData: string; fileName: string }[] =
      res.body;
    const templates = tempConnector.allTemplate.map((template) => {
      return {
        title: template.title,
        fileData: fs.readFileSync("./templates/" + template.file, "utf-8"),
        fileName: template.file,
      };
    });

    // 2. Testing data from tempConnector and api response.
    expect(APIResponse).toEqual(templates);
  });
});
