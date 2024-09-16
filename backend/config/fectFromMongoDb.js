import {MongoClient} from 'mongodb';

export const fetchData =async ()  =>{
    const url = process.env.MONGO_URI; // MongoDB connection string
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db('netflix_db'); // Replace with your DB name
        const collection = db.collection('movies'); // Replace with your collection name
       
        // Fetch data (e.g., all documents)
          const data = await collection.find().toArray(); // Use a query object if needed
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

