const User = require("./users-model.js");
const db = require("../../data/dbConfig.js");

// NOTE: set up the beforeAll, beforeEach and afterAll functions to run before each DESCRIBE:
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

//
describe("testing users-model file", () => {
  //
  describe("testing registerUser()", () => {
    test("adds a user", async () => {
      await User.registerUser({ username: "sarah", password: "password" });
      const user = await db("users");
      expect(user).toHaveLength(1);
    });
  });
  describe("testing getUser()", () => {
    test("getUser () returns list of all users", async () => {
      await User.registerUser({
        username: "sarah",
        password: "password",
      });
      const user = await User.getUser();
      expect(user).toBeDefined();
      expect(user).toHaveLength(1);
    });
  });
});
