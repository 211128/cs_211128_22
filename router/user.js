import { Router } from 'express';
import { success} from './response.js';
import {getData} from '../models/db.js'
import { getUser } from "../models/User.js";
import { getFather } from "../models/Father.js";



const router = Router();


const user = getUser.build({ attributes: ['id', 'username', 'email', 'password', 'phone_number'] });
console.log(user instanceof getUser); // true
console.log(user.name);


router.get('/success', function (req, res) {
    success(req, res, "", 200);

});


router.get('/list', async function (req, res) {
    getUser.findAll({include:{model:getFather,attributes:['name','fatherSurname','motherSurname','age']}, attributes: ['id','username',  'password'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        });
})

router.post('/add', async function (req, res) {
    getUser.create({ username: req.query.username, password: req.query.password});

})

router.put('/update', async function(req,res){

    let id= req.query.id;
    let newDatas=req.query;

    getUser.findOne({where:{id:id}})
    .then((r) => {
      r.update(newDatas)
      success(req, res, r, 200);
    })
    .catch((e) => {
      success(req, res, e, 400);
    });
})

router.delete('/delete', async function (req, res) {
    await getUser.destroy({
        where: {
            id: req.query.id
        }
    });
})
  





export default router;