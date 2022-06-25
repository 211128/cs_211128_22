import { Router } from 'express';
import { success } from './response.js';
import { getData } from '../models/db.js'
import { getSon } from "../models/Son.js";





const router = Router();


const son = getSon.build({ attributes: ['id', 'name', 'fatherSurname', 'motherSurname', 'age', 'id_father'] });
console.log(son instanceof getSon); // true
console.log(son.name);


router.get('/success', function (req, res) {
    success(req, res, "", 200);

});


router.get('/list', async function (req, res) {
    getSon.findAll({ attributes: ['name', 'fatherSurname', 'motherSurname', 'age'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        });
})

router.post('/add', async function (req, res) {
    getSon.create({ name: req.query.name, fatherSurname: req.query.fatherSurname, motherSurname: req.query.motherSurname, age: req.query.age, catFatherId: req.query.catFatherId });

})

router.put('/update', async function(req,res){

    let id= req.query.id;
    let newDatas=req.query;

    getSon.findOne({where:{id:id}})
    .then((r) => {
      r.update(newDatas)
      success(req, res, r, 200);
    })
    .catch((e) => {
      success(req, res, e, 400);
    });
})

router.delete('/delete', async function (req, res) {
    await getSon.destroy({
        where: {
            id: req.query.id
        }
    });
})






export default router;