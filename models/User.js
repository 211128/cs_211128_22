import {getData} from './db.js';
import { DataTypes, Sequelize } from 'sequelize';
import { getFather } from './Father.js';
import bcrypt from 'bcrypt';

//add sequalize add
const User = getData.sequelizeClient.define('cat_users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },


}, {
    tableName: 'cat_users',
    freezeTableName: true,
    hooks: {
        beforeCreate: (user, options) => {
            {
                user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
            }
        }
    }

});

User.hasMany(getFather, { foreignKey: 'catUserId' });



getFather.belongsTo(User);

export const getUser = User;