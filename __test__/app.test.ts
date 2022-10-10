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

  // testing the / route which gives all the templates
  test("GET /", async () => {
    const res = await request(app).get("/");

    const templates = tempConnector.allTemplate.map((template) => {
      return {
        title: template.title,
        fileData: fs.readFileSync("./templates/" + template.file, "utf-8"),
      };
    });

    expect(res.body).toEqual(templates);
  });
});
