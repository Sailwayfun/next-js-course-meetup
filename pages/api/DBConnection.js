import { MongoClient } from "mongodb";
const url = "mongodb+srv://liaoleon000513:qYzPBt47NV3QjQoa@clustermeetup.a5rut2p.mongodb.net/meetups?retryWrites=true&w=majority";
async function DBConnection() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        return {
            meetupsCollection: meetupsCollection,
            client: client
        };
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}


export default DBConnection;