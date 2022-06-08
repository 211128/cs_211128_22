import { Router } from 'express';
import { success} from '../../network/response.js';
import getConnection from "../../model/db.js";


const router = Router();

router.get('/s',function (req, res) {
    /*res.send({
        success:"succes 1",
    });*/
    succes(req, res ,'', 200);
})

router.post('/login', function (req, res) {

    let userName = req.query.userName;
    let pasword = req.query.pasword;

    res.send({
        token: "",
        id_user: "1",
        success: "exito",
    })
})

router.post('/register', async function (req, res) {

    const client = await getConnection();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request ={
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number) VALUES($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    };

    (await client).query(query_request)
    .then(r => {success(req,res,r,200);})
    .catch(e => {success(req,res,e.detail,200);})

})
router.get('/mostrar', async function (req, res) {

    const client = await getConnection();

    const query_request ={
        text: 'SELECT * FROM public.tbl_usersdb'
    };

    (await client).query(query_request)
    .then(r => {success(req,res,r,200);})
    .catch(e => {success(req,res,e.detail,200);})

})

router.delete('/eliminar', async function (req, res) {

    const client = await getConnection();

    let id = req.query.id;

    const query_request ={
        text: `DELETE FROM tbl_usersdb WHERE id=${id}`
    };

    (await client).query(query_request)
    .then(r => {success(req,res,r,200);})
    .catch(e => {success(req,res,e.detail,200);})

})

router.put('/actualizar', async function (req, res) {

    const client = await getConnection();

    let id = req.query.id;
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request ={
        text: `UPDATE tbl_usersdb SET username = '${username}', email = '${email}' , password = '${password}' , phone_number = '${phone_number}' where id = '${id}'`
    };

    (await client).query(query_request)
    .then(r => {success(req,res,r,200);})
    .catch(e => {success(req,res,e.detail,200);})

})


export default router;