import express from 'express'  // za kreiranje na server
import mongoose, { connect } from 'mongoose'  // za povrzuvanje so baza
import dotenv from 'dotenv'  // za skrivanje na osetlivi invormacii
import MainRouter from './MVC/routes/main-router.js';
import cors from "cors";

dotenv.config();  // This line loads environment variables from a .env file into process.env. 
const {PORT, HOSTNAME, MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB_NAME} = process.env   // takes the values from process.env and assigns them to constants.
const URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;   //This constructs a MongoDB connection URI using the environment variables.

const app = express(); // kreirame server
app.use(cors({ origin: '*' }));

app.use(express.json()) // Se povrzuvame so middleware za citanje json sodrzina
app.use('/api', MainRouter) // Se povrzuvame so glavniot router

async function init() {
    try {
        await mongoose.connect(URI);
    } catch (error){
        console.log(`Connection to MongoDB failed!`, error)
    }
    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server started listening on http://${HOSTNAME}:${PORT}`);
    });
}
init();

