const dbConfig = {
  sql: {
    HOST: process.env.SQL_HOST,
    USER: process.env.SQL_USER,
    PASSWORD: process.env.SQL_PASSWORD,
    DB: process.env.SQL_DATABASE,
    DIALECT: process.env.SQL_DIALECT,
  },
  mongo: {
    URI: process.env.MONGO_URI,
  },
};

module.exports = dbConfig;
