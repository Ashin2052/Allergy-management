import * as allergyService from '../services/allergy.service'
import {IAllergy} from "../models/allergy.schema";
import {Router} from "express";
import {Ipagination} from "../types/shared.types";

const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = Router();

router.get('/', auth, async (req, res, next) => {
    const pagination: Ipagination = {
        limit: +req.query.limit, page: +req.query.page, totalPages: 0
    }
    allergyService.getAllergies(pagination)
        .then(data => res.json(data))
        .catch(err => next(err));
})

router.post('/', upload.single('image'), async (req, res, next) => {
    allergyService.createAllergy(req.body as IAllergy, req.file)
        .then(data => res.json(data))
        .catch(err => next(err));
});
router.put('/', upload.single('image'), async (req, res, next) => {
    allergyService.updateAllergy(req.body as IAllergy, req.file)
        .then(data => res.json(data))
        .catch(err => next(err));
});

router.get('/:id', auth, async (req, res, next) => {
    allergyService.getById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(err));
});


export default router;