const server = require("./server.js");
const request = require("supertest");
const db = require("../data/dbConfig.js");

describe("server.js test", () => {
  describe("GET /", () => {
    let res;
    beforeAll(async () => {
      res = await request(server).get("/");
    });
    test("returns 200", () => {
      expect(res.status).toBe(200);
    });
    test("response is JSON", () => {
      expect(res.type).toBe("application/json");
    });
    test("should return {message:cats is working!}", () => {
      expect(res.body).toEqual({ message: "cats is working!" });
    });
  });
});
