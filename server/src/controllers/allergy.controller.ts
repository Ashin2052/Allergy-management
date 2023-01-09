import * as allergyService from '../services/allerty.service'
import {IAllergy} from "../models/allergy.schema";
import {Router} from "express";
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = Router();
router.post('/',upload.single('image'), async (req, res, next) => {
    allergyService.createAllergy(req.body as IAllergy,req.file)
        .then(data => res.json(data))
        .catch(err => next(err));
});router.put('/',upload.single('image'), async (req, res, next) => {
    allergyService.updateAllergy(req.body as IAllergy,req.file)
        .then(data => res.json(data))
        .catch(err => next(err));
});

router.get('/:id',upload.single('image'), async (req, res, next) => {
    allergyService.getById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(err));
});


export default router;