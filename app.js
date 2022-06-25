 import express from 'express';
 import { api } from './config/config.js';
 import user from './router/user.js';
 import father from './router/father.js';
 import image from './router/image.js';
 import son from './router/son.js';
 

const app = express();  

//ROUTERS
 app.use('/api/user', user);
 app.use('/api/father', father);
 app.use('/api/image', image);
 app.use('/api/son', son);

//  app.use(cors({origin: true, credential: true}));

//Servidor activo
app.listen( api.port ,() => {
    console.log('Servidor corriendo en el puerto en el puerto =>',"3000")
}
);

