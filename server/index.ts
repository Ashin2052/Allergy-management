import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import routerManager from './src/routes';
import connect from './connect';
import {errorHandler} from "./src/utils/errorhandler";
import cors from 'cors';
const mongoose = require("mongoose");

require('dotenv').config({ path: `src/configs/.env.${process.env.NODE_ENV}` });

const app: Application = express();
app.use(cors({
    origin: process.env.ORIGIN
}));
app.listen(process.env.PORT || 9000, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
});
connect({db: process.env.MONGODB_URI});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded\
app.use('/api', routerManager);
app.use(errorHandler);