import { Router } from 'express';
import { success } from './response.js';
import { getData } from '../models/db.js'
import { getFather } from "../models/Father.js";
import { getSon } from '../models/Son.js';





const router = Router();


const father = getFather.build({ attributes: ['id', 'name', 'fatherSurname', 'motherSurname', 'age', 'id_user'] });
console.log(father instanceof getFather); // true
console.log(father.name);


router.get('/success', function (req, res) {
    success(req, res, "", 200);

});


router.get('/list', async function (req, res) {
    getFather.findAll({ include:{model:getSon, attributes:['name','fatherSurname','motherSurname','age']}, attributes: ['name', 'fatherSurname', 'motherSurname', 'age'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        });
})

router.post('/add', async function (req, res) {
    getFather.create({ name: req.query.name, fatherSurname: req.query.fatherSurname, motherSurname: req.query.motherSurname, age: req.query.age, catUserId: req.query.catUserId });

})

router.put('/update', async function(req,res){

    let id= req.query.id;
    let newDatas=req.query;

    getFather.findOne({where:{id:id}})
    .then((r) => {
      r.update(newDatas)
      success(req, res, r, 200);
    })
    .catch((e) => {
      success(req, res, e, 400);
    });
})

router.delete('/delete', async function (req, res) {
    await getFather.destroy({
        where: {
            id: req.query.id
        }
    });
})






export default router;