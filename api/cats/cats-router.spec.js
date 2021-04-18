const db = require("../../data/dbConfig.js");
const server = require("../server.js");
const request = require("supertest");
const { notify } = require("../server.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("cats").truncate();
});

afterAll(async () => {
  await db.destroy();
});
//
//

describe("cats router test", () => {
  //
  describe("POST endpoint", () => {
    let res;
    const myCat = { cat_name: "promise" };
    test("cat to be inserted", async () => {
      res = await request(server).post("/api/cats").send(myCat);

      expect(res.body.cat_name).toEqual("promise");
    });
    //
    test("returns 201", async () => {
      let res = await request(server).post("/api/cats").send(myCat);
      expect(res.status).toBe(201);
      expect(res.status).not.toBe(200);
    });
  });

  describe("DELETE endpoint", () => {
    let res2;
    const newCat = { cat_name: "promise" };
    beforeAll(async () => {
      let res2 = await request(server).post("/api/cats").send(newCat);
    });

    test("status returned is 204", async () => {
      res2 = await request(server).delete("/api/cats/1");
      expect(res2.status).toBe(204);
    });
    test("res body to be empty object", async () => {
      res2 = await request(server).delete("/api/cats/1");

      expect(res2.body).toEqual({});
    });
  });
});
