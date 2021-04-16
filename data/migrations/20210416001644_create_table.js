exports.up = function (knex) {
  return knex.schema.createTable("pastas", (tbl) => {
    tbl.increments();
    tbl.string("pasta_name", 128).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pastas");
};
