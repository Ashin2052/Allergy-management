import * as userService from '../services/user.service'
import {Router} from "express";
const upload = require("../middlewares/multer");

const router = Router();
router.post('/register', async (req, res, next) => {
    userService.register(req)
        .then(data => res.json(data))
        .catch(err => next(err));
});
router.post('/refresh_token', async (req, res, next) => {
    userService.generateRefreshToken(req,res)
        .then(data => res.json(data))
        .catch(err => next(err));
});

router.post('/login', async (req, res, next) => {
    userService.login(req,res)
        .then(data => res.json(data))
        .catch(err => next(err));
});

router.post('/logout', async (req, res, next) => {
    userService.logout(req,res)
        .then(data => res.json(data))
        .catch(err => next(err));
});

export default router;