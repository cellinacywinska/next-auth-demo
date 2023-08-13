const { sq } = require("../lib/postgres"); // Use 'sq' alias
const { DataTypes } = require("sequelize");


const User = sq.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

User.sync().then(() => {
  console.log("USER MODEL")
  // Table created
}).catch((err) => {
  console.log("ERERRR");
  console.log(err);
});

module.exports = { User };