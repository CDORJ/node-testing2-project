// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    connection: {
      filename: "./data.pasta.db3", // db **name to be unique**
    },
    pool: {
      // **only needed if foreign keys will be used**
      afterCreate: (conn, done) => {
        _conn_.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  testing: {
    client: sqlite3,
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    connection: {
      filename: "./data/testing.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: pgConnection,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
