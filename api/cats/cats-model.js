const db = require("../../data/dbConfig.js");

function get() {
  return db("cats");
}
async function getById(id) {
  const cat = await db("cats").where({ id }).first();
  return cat;
}

async function insert(cat) {
  const [id] = await db("cats").insert(cat);
  return getById(id);
}

function remove(id) {
  return db("cats").delete(id);
}

module.exports = {
  get,
  getById,
  insert,
  remove,
};
