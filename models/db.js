import Sequelize from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { db } from '../config/config.js';

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);

const data = dotenv.config({
    path: path.resolve(dirname,` ../environments/.env.${process.env.NODE_ENV}`)
});

const sequelizeClient = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return new Sequelize(db.database, db.user, db.password, {
                host: db.host,
                dialect: 'postgres',
            });

        case 'test':
            return new Sequelize(db.database, db.user, db.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                host: db.host,
                dialect: 'postgres',
            });

        default:
            return new Sequelize(db.database, db.user, db.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                    }
                },
                host: db.host,
                dialect: 'postgres',
            });
    }
})();



sequelizeClient.sync({ force: true })
    .then(() => {
        console.log('Conectado')
    })
    .catch((err) => {
        console.log('No se conecto', err)
    });

export const getData = { sequelizeClient };