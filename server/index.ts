import express, { Application} from 'express';
import bodyParser from 'body-parser';
import routerManager from './src/routes';
import connect from './src/configs/connect';
import {errorHandler} from "./src/utils/errorhandler";
import cors from 'cors';
import swaggerJsdoc from "swagger-jsdoc";
import {options} from "./swagger";
import {applicationConfig} from "./src/configs/config";
import logger from "./src/configs/logger";

const swaggerUi = require("swagger-ui-express");


const app: Application = express();
app.use(cors({
    origin: applicationConfig.ORIGIN
}));

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

connect({db: applicationConfig.MONGODB_URI});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded\
app.use('/api', routerManager);
app.use(errorHandler);
app.listen(applicationConfig.PORT || 9000, () => {
    logger.info(`Server is listening on ${process.env.PORT}`);
});


