const db = require("../../data/dbConfig.js");

function get() {
  return db("pastas");
}
async function getById(id) {
  const pasta = await db("pastas").where({ id }).first();
  return pasta;
}

async function insert(pasta) {
  const [id] = await db("pastas").insert(pasta);
  return getById(id);
}

function remove(id) {
  return db("pastas").delete(id);
}

module.exports = {
  get,
  getById,
  insert,
  remove,
};
