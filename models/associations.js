import { User } from "./User";
import { Patient } from "./Patient";

Patient.belongsTo(User, { foreignKey: 'id_patient', targetKey: 'id_user' });
User.hasOne(Patient, { foreignKey: 'id_patient' });
