import app from "../app";
import request from "supertest";

/*
Before running tests, run this command:
$ npx ts-jest config:init
*/

describe("Test app.ts", () => {
  test("GET /", async () => {
    const res = await request(app).get("/");

    expect(res.body).toEqual({ message: "Hi" });
  });
});
