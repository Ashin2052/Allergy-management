import {TRoutesInput} from '../types/routes';
import AllergyController from "../controllers/allergy/allergy.controller";
import UserController from "../controllers/user.controller";
const Router=require('express').Router;

const router = Router();

router.use(`/allergy`, AllergyController);
router.use(`/user`, UserController);


export default router;