import { getData } from "./db.js";
import { DataTypes } from "sequelize";


const image = getData.sequelizeClient.define('cat_img',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


export const getImage = image;