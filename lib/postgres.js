
const {Sequelize} = require("sequelize");
import pg from 'pg';
// import {User} from '@/models/User';

const sequelize = new Sequelize('authapp', 'postgres', 'postgres', {host:'localhost', dialect:"postgres", dialectModule:pg})

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      // await User.sync();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
  export {testDbConnection}
export {sequelize}

  module.exports = { sq: sequelize, testDbConnection };
