import mongoose from 'mongoose'; 

const clientOptions = {
    dbName: 'api-russell-marina'
};

export const initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected');
    } catch (error) {
        console.error(error);
        throw error;
    }
}