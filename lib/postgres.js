
const Sequelize = require("sequelize");
const pg = require('pg');
// import { User } from "@/models/User";

const seq = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWRD, { host: 'localhost', dialect: "postgres", dialectModule: pg })

const testDbConnection = async () => {
  try {
    await seq.authenticate();
    console.log("Connection has been established successfully.");
    // await User.sync({force: true});
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sq: seq, testDbConnection };