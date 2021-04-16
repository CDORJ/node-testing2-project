const db = require("../../data/dbConfig.js");
const server = require("../server.js");
const request = require("supertest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("pastas").truncate();
});

afterAll(async () => {
  await db.destroy();
});
//
//

describe("pastas router test", () => {
  //
  describe("POST endpoint", () => {
    let res;
    const newPasta = { pasta_name: "ravioli" };
    test("pasta to be inserted", async () => {
      res = await request(server).post("/api/pastas").send(newPasta);
      console.log(res.body.pasta_name);
      expect(res.body.pasta_name).toEqual("ravioli");
    });
    //
    test("returns 201", async () => {
      let res = await request(server).post("/api/pastas").send(newPasta);
      expect(res.status).toBe(201);
    });

    describe("DELETE endpoint", () => {
      let res;
      const newPasta = { pasta_name: "ravioli" };
      beforeEach(async () => {
        let res = await request(server).post("/api/pastas").send(newPasta);
      });
      test("delete");
    });
  });
});
