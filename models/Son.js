import { getData } from './db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
//add sequalize add

const Son = getData.sequelizeClient.define('cat_sons', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    fatherSurname : {
        type: DataTypes.STRING,
        allowNull: false,

    },

    motherSurname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    id_father: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }

}, {
    tableName: 'cat_sons',
    freezeTableName: true,
    
});


export const getSon =  Son;