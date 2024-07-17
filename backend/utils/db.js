
import { MongoClient, ServerApiVersion, ObjectId} from 'mongodb';
const uri = "mongodb+srv://tiagords:avss2k24@cluster0.z3ooiud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});

export async function database() {
    try {
        await client.connect();
        const db = client.db("avss-db");

        return db;
    } catch (error) {
        console.log(error);
    }
}
