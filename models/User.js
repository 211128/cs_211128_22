import {getData} from './db.js';
import { Sequelize } from 'sequelize';
//add sequalize add
const User = getData.sequelizeClient.define('cat_users',{
    id:{type: Sequelize.SMALLINT, primaryKey: true},
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    phone_number: Sequelize.STRING,
},{
    
})

export const getUser = User;