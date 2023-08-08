const { sequelize } = require("../lib/postgres");

const User = sequelize.define("users", {
    email: {
      type: String,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: String,
      required: true,
    }
});
// User.sync({force: true}).then(() => {
//     // Table created
//     return User.create({
//       email: 'john',
//       password: '123'
//     });
//   });

module.exports = {User};

