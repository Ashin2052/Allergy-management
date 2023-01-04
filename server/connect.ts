import mongoose from 'mongoose';

type TInput = {
    db: string;
}
export default ({db}: TInput) => {
    const connect = () => {
        mongoose.set({strictQuery: false})
        mongoose.connect(db)
            .then(() => {
                return console.info(`Successfully connected to database`);
            })
            .catch((error) => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            })
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};