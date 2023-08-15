const { sq } = require("../lib/postgres"); // Use 'sq' alias
const { DataTypes } = require("sequelize");

const Patient = sq.define('Patient', {
    id_patient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});


Patient.sync().then(() => {
    console.log("Patient MODEL");
    // Patient.create({ id_patient: 1 })
}).catch((err) => {
    console.log("ERERRR");
    console.log(err);
});

module.exports = { Patient };