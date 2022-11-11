const { MongoClient } = require('mongodb');
const { MONGODB_CONNECT_URL } = require('./env.config')

const uri = MONGODB_CONNECT_URL;

const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true});

const databaseFunctions = {
    async connectDatabase() {
        try {
            await client.connect();
            console.log("Database connected successfully");
        } catch (error) {
            console.log(error);
    }
    },
    async createEvent(newEvent) {
        try {
            await client.db("test").collection("events").insertOne(newEvent);
        } catch (error) {
            console.log(`Error while creating event: ${error}`);
        }
    },
    async listtDatabases() {
        const databaseList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databaseList.databases.forEach(db => console.log(` - ${db.name}`));
    },
    async getEvents() {
        try {
            const result = await client.db("test").collection("events").find({}).toArray();
            return result;
        } catch (error) {
            console.log(`Error while getting events: ${error}`);
        }
    },
    async updateEvent(event) {
        try {
            await client.db("test").collection("events").findOneAndDelete({_id: event._id}, {$set: event});
        } catch (error) {
            console.log(`Error while updating event: ${error}`);
        }
    }
}

module.exports = databaseFunctions;
