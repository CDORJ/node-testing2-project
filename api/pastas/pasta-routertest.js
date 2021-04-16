const db = require("../../data/dbConfig.js");
const server = require("../server.js");
const request = require("supertest");
const { notify } = require("../server.js");

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
    const myPasta = { pasta_name: "ravioli" };
    test("pasta to be inserted", async () => {
      res = await request(server).post("/api/pastas").send(myPasta);

      expect(res.body.pasta_name).toEqual("ravioli");
    });
    //
    test("returns 201", async () => {
      let res = await request(server).post("/api/pastas").send(myPasta);
      expect(res.status).toBe(201);
      expect(res.status).not.toBe(200);
    });
  });

  describe("DELETE endpoint", () => {
    let res2;
    const newPasta = { pasta_name: "ravioli" };
    beforeAll(async () => {
      let res2 = await request(server).post("/api/pastas").send(newPasta);
    });

    test("status returned is 204", async () => {
      res2 = await request(server).delete("/api/pastas/1");
      expect(res2.status).toBe(204);
    });
    test("res body to be empty object", async () => {
      res2 = await request(server).delete("/api/pastas/1");

      expect(res2.body).toEqual({});
    });
  });
});
