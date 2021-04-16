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
    test("registerUser(user) works", async () => {
      await User.registerUser({ username: "sarah", password: "password" });
      const user = await db("users");
      expect(user).toHaveLength(1);
    });
  });
  describe("testing getUser()", () => {
    test("getUser() returns list of all users", async () => {
      await User.registerUser({
        username: "sarah",
        password: "password",
      });
      const user = await User.getUser();
      expect(user).toBeDefined();
      expect(user).toHaveLength(1);
    });
  });
  describe("testing getUsersById(id)", () => {
    test("getById returns a specific user", async () => {
      await User.registerUser({
        username: "sarah",
        password: "password",
      });
      await User.registerUser({
        username: "chad",
        password: "password",
      });
      const userId = await User.getUserById(2);
      expect(userId).toEqual({
        user_id: 2,
        username: "chad",
        password: "password",
      });
    });
    describe("getUserBy(filter)", () => {
      test("getUserBy(filter) returns with proper value", async () => {
        await User.registerUser({
          username: "sarah",
          password: "password",
        });
        await User.registerUser({
          username: "chad",
          password: "password",
        });
        const filteredUser = await User.getUserBy({ username: "sarah" });
        expect(filteredUser).toEqual([
          {
            user_id: 1,
            username: "sarah",
            password: "password",
          },
        ]);
      });
    });
  });
});
