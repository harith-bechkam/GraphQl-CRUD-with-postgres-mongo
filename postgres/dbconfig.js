const Sequelize = require("sequelize");
require("dotenv").config();
let { development } = require("./config/config.json");
const dressdb = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    dialect: "postgres",
    host: "localhost",
    logging: false,
    port: 5432,
  }
);

dressdb
  .authenticate()
  .then(() => {
    console.log(`Connected to ${process.env.DB_name} DB`);
  })
  .catch((err) => {
    console.error(`Unable to connect to the ${process.env.DB_name} DB:`, err);
  });

dressdb.sync();

/* User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
   User.sync({ force: true }) - This creates the table, dropping it first if it already existed
   User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
 */

module.exports = { dressdb };
