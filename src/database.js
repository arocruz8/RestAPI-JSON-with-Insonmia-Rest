import { MongoClient } from 'mongodb';

export async function connect(){
    const nombreDB = "StudentsJSON"
    const uri = "mongodb+srv://arocruz:redes2020@clusterloginredes.nkggq.mongodb.net/"+nombreDB+"?retryWrites=true&w=majority"
    const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true})
  
  
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const DB = client.db(nombreDB);
        console.log('Conectado a MongoDB: '+nombreDB);
        return DB;
 
    } catch (e) {
        console.error(e);
    } 
}
