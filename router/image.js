import { Router } from "express";
import { getImage } from "../models/Image.js";
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        cb(null, `${Date.now()}.${ext}`)
    }
})

const upload = multer({ storage })

router.post('/upload', upload.single('name'), async function (req, res) {

    // console.log(req.body.file)
    getImage.create({
        
        name: req.file.originalname
    }, { fields: ['name'] })
        .then(img => {
            res.send(img)
        })
        .catch(err => {
            console.log(err)
        });
})

router.get('/get_all', async function (req, res) {
    getImage.findAll({ exclude: [] })
        .then(img => {
            res.send(img)
        })
        .catch(err => {
            console.log(err)
        })
});

export default router;