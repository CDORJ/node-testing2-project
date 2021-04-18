exports.up = function (knex) {
  return knex.schema.createTable("cats", (tbl) => {
    tbl.increments();
    tbl.string("cat_name", 128).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cats");
};
