const { sq } = require("../lib/postgres"); // Use 'sq' alias
const { DataTypes } = require("sequelize");


const User = sq.define("Users", {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  // User.create({ id_user: 1, email: "asdf", password: "asdf" })
  // Table created
}).catch((err) => {
  console.log("ERERRR");
  console.log(err);
});

module.exports = { User };