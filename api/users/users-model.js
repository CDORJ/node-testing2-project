const db = require("../../data/dbConfig.js");

module.exports = {
  getUser,
  getUserById,
  getUserBy,
  registerUser,
};

function getUser() {
  return db("users");
}

function getUserById(id) {
  return db("users").where({ id }).first();
}

function getUserBy(filter) {
  return db("users").where(filter);
}

async function registerUser(user) {
  const [id] = await db("users").insert(user);
  return getUserById(id);
}
