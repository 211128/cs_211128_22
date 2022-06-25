import { Router } from 'express';
import { success } from './response.js';
import { getData } from '../models/db.js'
import { getFather } from "../models/Father.js";





const router = Router();


const father = getFather.build({ attributes: ['id', 'name', 'fatherSurname', 'motherSurname', 'age', 'id_user'] });
console.log(father instanceof getFather); // true
console.log(father.name);


router.get('/success', function (req, res) {
    success(req, res, "", 200);

});


router.get('/list', async function (req, res) {
    getUser.findAll({ attributes: ['name', 'fatherSurname', 'motherSurname', 'age', 'id_user'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        });
})

router.post('/add', async function (req, res) {
    getUser.create({ name: "mario", fatherSurname: "sequelize12@gmail", motherSurname: "o123q@", age: "9876543", id_user: "1" });

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