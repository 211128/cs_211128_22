import { getData } from './db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { getUser } from './User.js';
import { getSon } from './Son.js';
//add sequalize add

const Father = getData.sequelizeClient.define('cat_fathers', {
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
   
}, {
    tableName: 'cat_fathers',
    freezeTableName: true,

});

Father.hasMany(getSon, {
  
});

getSon.belongsTo(Father);


export  const getFather =  Father;