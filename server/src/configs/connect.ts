import mongoose from 'mongoose';
import logger from "./logger";

type TInput = {
    db: string;
}
export default ({db}: TInput) => {
    const connect = () => {
        mongoose.set({strictQuery: false})
        mongoose.connect(db)
            .then(() => {
                logger.info(`Successfully connected to database`);
                return;
            })
            .catch((error) => {
                logger.error('Error connecting to database: ', error.toString());
                return process.exit(1);
            })
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};