//POST /api/new-meetup
// import { MongoClient } from "mongodb";
// const url = "mongodb+srv://liaoleon000513:nchHn4tMm0NlOEoX@clustermeetup.a5rut2p.mongodb.net/meetups?retryWrites=true&w=majority";
import DBConnection from "./DBConnection";
async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        // const { title, image, address, description } = data;
        const { meetupsCollection, client } = await DBConnection();
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({ message: "Meetup Inserted!" });
    }

}

export default handler;