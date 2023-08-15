import { User } from "./User";
import { Patient } from "./Patient";
import { Dietitian } from "./Dietitian";

Patient.belongsTo(User, { foreignKey: 'id_patient', targetKey: 'id_user' });
User.hasOne(Patient, { foreignKey: 'id_patient' });

Dietitian.belongsTo(User, { foreignKey: 'id_dietitian', targetKey: 'id_user' });
User.hasOne(Dietitian, { foreignKey: 'id_dietitian' });
