import request from "supertest";
import app from "../app";
import tempConnector from "../templates/tempConnector";
import fs from "fs";

describe("Test for health", () => {
  test("GET /healthCheck", async () => {
    const res = await request(app).get("/healthCheck");
    expect(res.text).toEqual("ok");
  });
});

describe("Testing templates data", () => {
  test("Test of templates length: GET /", async () => {
    const res = await request(app).get("/");
    const allTemplatesFromAPI = res.body;
    const allTemplates = tempConnector.allTemplate;

    expect(allTemplatesFromAPI.length).toEqual(allTemplates.length);
  });

  test("Test of all file names and title: GET /", async () => {
    const res = await request(app).get("/");
    let tempNamesArrayFromAPI = [];
    let tempNamesArray = [];

    res.body.forEach((temp) => {
      tempNamesArrayFromAPI.push({
        file: temp.fileName,
        title: temp.title,
      });
    });

    tempConnector.allTemplate.forEach((temp) => {
      tempNamesArray.push({
        file: temp.file,
        title: temp.title,
      });
    });

    expect(tempNamesArrayFromAPI).toEqual(tempNamesArray);
  });

  test("Test for the templates content: GET /", async () => {
    const res = await request(app).get("/");
    const tempContentFromAPI = [];
    const tempContent = [];

    res.body.forEach((temp) => {
      tempContentFromAPI.push(temp.fileData);
    });

    tempConnector.allTemplate.forEach((temp) => {
      const document = fs.readFileSync("./templates/" + temp.file, "utf-8");
      tempContent.push(document);
    });

    expect(tempContentFromAPI).toEqual(tempContent);
  });
});
