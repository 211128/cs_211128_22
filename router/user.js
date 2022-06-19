import { Router } from 'express';
import { success} from './response.js';
import {getData} from '../models/db.js'
import { getUser } from "../models/User.js";




const router = Router();


const user = getUser.build({ attributes: ['id', 'username', 'email', 'password', 'phone_number'] });
console.log(user instanceof getUser); // true
console.log(user.name);


router.get('/success', function (req, res) {
    success(req, res, "", 200);

});


router.get('/list', async function (req, res) {
    getUser.findAll({ attributes: ['username', 'email', 'password', 'phone_number'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        });
})

router.post('/add', async function (req, res) {
    getUser.create({ username: "chingon", email: "sequelize12@gmail", password: "o123q@", phone_number: "9876543" });

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