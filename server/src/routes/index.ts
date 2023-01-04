import {TRoutesInput} from '../types/routes';
import AllergyController from "../controllers/allergy.controller";
const Router=require('express').Router;

const router = Router();
router.use(`/allergy`, AllergyController);


export default router;