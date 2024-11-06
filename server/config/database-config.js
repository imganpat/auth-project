import mongoose from "mongoose";

const URI = `mongodb+srv://ganpat:ganpat@rentkaro.m2le9.mongodb.net/RentKaro?retryWrites=true&w=majority&appName=RentKaro`

const createConnection = async (URI) => {
    try {
        await mongoose.connect(URI, { dbName: 'test' });
        console.log('Connected to the database');

    } catch (error) {
        console.log("Error: " + error);
    }
}

const database = createConnection(URI)

export default database;