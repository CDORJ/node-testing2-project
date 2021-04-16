const db = require("../../data/dbConfig.js");

module.exports = {
  getUser,
  getUserById,
  getUserBy,
  registerUser,
};

function getUser() {
  return db("users")
    .select("user_id", "username", "password")
    .orderBy("user_id");
}

function getUserById(id) {
  return db("users").where({ user_id: id }).first();
}

function getUserBy(filter) {
  return db("users").where(filter).orderBy("user_id");
}

async function registerUser(user) {
  const [id] = await db("users").insert(user, "user_id");
  return getUserById(id);
}
