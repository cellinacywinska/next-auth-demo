const { sq } = require("../lib/postgres"); // Use 'sq' alias
const { DataTypes } = require("sequelize");
import { User } from "./User";

const Dietitian = sq.define('Dietitian', {
    id_dietitian: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

Dietitian.belongsTo(User, { foreignKey: 'id_dietitian', targetKey: 'id_user' });

Dietitian.sync().then(() => {
    console.log("DIETITIAN MODEL")
}).catch((err) => {
    console.log("ERERRR");
    console.log(err);
});

module.exports = { Dietitian };