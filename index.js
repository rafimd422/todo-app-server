const express = require('express')
var cors = require('cors')
require('dotenv').config()
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.TODO}:${process.env.TODO_PASS}@cluster0.sopxnju.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("taskDB");
    const collection = database.collection("todos");

app.get('/todo', async(req,res)=>{
    const result = await collection.find().toArray()
    res.send(result)
})

app.post('/todo', async(req, res)=>{
    const todos = req.body;
    const result = await collection.insertOne(todos)
    res.send(result)
})

app.patch('/todo/:id', async(req,res) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: new ObjectId(id) };
const updateDoc = {
$set: {
  status: body.status
}
}
const result = await collection.updateOne(filter, updateDoc)
res.send(result)

})




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);












app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})