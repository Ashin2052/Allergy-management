import * as allergyService from '../services/allergy.service'
import {IAllergy} from "../models/allergy.schema";
import {Router} from "express";
import {Ipagination} from "../types/shared.types";

const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The title of your book
 *         email:
 *           type: string
 *           description: User email
 *         role:
 *           type: string
 *           description: User role
 *       example:
 *         id: d5fE_asz
 *         name: john doe
 *         email: john@lf.com
 *         role: admin
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 * /allergy:
 *   get:
 *     summary: Lists all the books
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Authentication
 *         content:
 *           application/json:
 *              schema:
 * /allergy:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 */
router.get('/', auth, async (req, res, next) => {
    const pagination: Ipagination = {
        limit: +req.query.limit, page: +req.query.page, totalPages: 0
    }
    allergyService.getAllergies(pagination)
        .then(data => res.json(data))
        .catch(err => next(err));
})

router.post('/', upload.single('image'), auth, async (req, res, next) => {
    allergyService.createAllergy(req.body as IAllergy, req.file)
        .then(data => res.json(data))
        .catch(err => next(err));
});
router.delete('/:id', upload.single('image'), auth, async (req, res, next) => {
    allergyService.deleteAllergy(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(err));
});

router.put('/:id', upload.single('image'), auth, async (req, res, next) => {
    allergyService.updateAllergy(req.body as IAllergy,req.params.id, req.file)
        .then(data => res.json(data))
        .catch(err => next(err));
});

router.get('/:id', auth, async (req, res, next) => {
    allergyService.getById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(err));
});


export default router;