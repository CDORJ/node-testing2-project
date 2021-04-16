exports.up = function (knex) {
  return knex.schema
    .createTable("pastas", (tbl) => {
      tbl.increments("pasta_id");
      tbl.string("pasta_name", 128).unique().notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
      tbl
        .integer("pasta_id")
        .unsigned()
        .notNullable()
        .references("pastas.pasta_id")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("pastas");
};
