const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())


//coffeMaster
//VDszJpgeDIpATwC9



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjxtifp.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri)


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

//Connect to the "insertDB" database and access its 
const databaseCoffee  = client.db("coffeeDB").collection("coffee")

//database your user information then sent your client
app.get('/coffee', async(req, res) =>{
    const  cursor = databaseCoffee.find()
    const result = await cursor.toArray()
    res.send(result)

})

// client side your information then update your database 
app.get('/coffee/:id', async(req, res) => {
  const id = req.params.id
  const query = { _id: new ObjectId(id)}
  const result = await databaseCoffee.findOne(query)
  res.send(result)
})

//client side your information then recive your bacent side
app.post('/coffee',async(req, res) =>{
    const newCoffee = req.body;
    console.log(newCoffee)
    const result = await databaseCoffee.insertOne(newCoffee)
    res.send(result)
})

app.put('/coffee/:id', async(req, res) =>{
  const id = req.params.id
  const filter = {_id: new ObjectId(id)}
  const option = {upsert: true}
  const updateCoffee = req.body;
   const Coffee = {
     $set: {
      name:updateCoffee.name,
       quantity:updateCoffee.quantity,
       Supplier:updateCoffee.Supplier, 
       taste:updateCoffee.taste ,
       category:updateCoffee. category,
        Details:updateCoffee.Details,
         photo:updateCoffee.photo
     }
   }
   const result = await databaseCoffee.updateOne(filter, Coffee, option)
   res.send(result)
})


// client side your information then database delete?
app.delete('/coffee/:id', async(req, res)=>{
  const id = req.params.id
  const query = {_id: new ObjectId(id)}
  const result = await databaseCoffee.deleteOne(query)
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


app.get('/', (req,res) => {
    res.send('please coffee is the best server side')
})

app.listen(port, (req, res) => {
    console.log(`express cors mongodb dotenv: ${port}`);
    
})