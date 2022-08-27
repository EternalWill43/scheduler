import { MongoClient } from "mongodb";

const MONGODB_URI = import.meta.env.MONGODB_URI;
const MONGODB_DB = import.meta.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check if connection and DB are cached
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
