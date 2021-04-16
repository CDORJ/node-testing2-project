const Users = require("./users-model.js");
const server = require("../server.js");
const request = require("supertest");
const db = require("../../data/dbConfig.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("testing the auth router file", () => {
  describe("GET endpoint", () => {
    test('router.get("/") returns list of users', async () => {
      await Users.registerUser({ username: "chad", password: "password" });
      const users = await request(server).get("/api/users");
      console.log(users.body);
      expect(users.body).toEqual([
        { user_id: 1, username: "chad", password: "password" },
      ]);
    });
    test("response status should be 200", async () => {
      await Users.registerUser({
        username: "chad",
        password: "password",
      });
      const users = await request(server).get("/api/users");
      expect(users.status).toBe(200);
    });
  });
  describe("POST ENDPOINTS", () => {});
});
