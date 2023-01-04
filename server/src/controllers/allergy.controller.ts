import {TRoutesInput} from '../types/routes';
import * as allergyService from '../services/allerty.service'
import {IAllergy} from "../models/Allergy";
import {Router} from "express";

const router = Router();
router.post('/', async (req, res, next) => {
    allergyService.createAllergy(req.body as IAllergy).then(value => {
        console.log(value)
    })
    allergyService.createAllergy(req.body as IAllergy)
        .then(data => res.json(data))
        .catch(err => next(err));
});

router.get('/', (req, res) => {
    console.log('ap33i')
});

export default router;