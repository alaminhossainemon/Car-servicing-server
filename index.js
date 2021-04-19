const cors = require('cors');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser')
require('dotenv').config();

const port = process.env.PORT ||4000;
app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g33ro.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("addServices").collection("service");
  const reviewCollection = client.db("addReview").collection("review"); 
  const orderCollection = client.db("orderList").collection("oreder"); 
  const adminCollection = client.db("allAdmins").collection("admin"); 
 
 app.get('/services', (req, res)=>{
   serviceCollection.find()
   .toArray((err, service)=>{
    console.log(err);
    res.send(service);
   })
 });

 app.get('/order', (req, res)=>{
  orderCollection.find()
  .toArray((err, order)=>{
   console.log(err);
   res.send(order);
  })
});

 app.get('/reviews', (req, res)=>{
  reviewCollection.find()
  .toArray((err, review)=>{
   console.log(err);
   res.send(review);
  })
});
 app.post('/addReviews', (req, res)=>{
   const newReview =req.body;
   console.log(newReview);
    reviewCollection.insertOne(newReview)
   .then(result =>{
     console.log('insert',result.insertedCount);
     res.send( result.insertedCount > 0)
   })
 });

 app.post('/addAdmin', (req, res)=>{
  const newAdmin =req.body;
  console.log(newAdmin);
  adminCollection.insertOne(newAdmin)
  .then(result =>{
    console.log('insert',result.insertedCount);
    res.send( result.insertedCount > 0)
  })
});
 
  app.post('/addService',(req, res) => {
    const newService = req.body;
    serviceCollection.insertOne(newService)
    .then(result => {
      console.log('insert',result.insertedCount);
      res.send(result.insertedCount > 0);
    })
  });

  app.post('/addOrder',(req, res) => {
    const newOrder = req.body;
    orderCollection.insertOne(newOrder)
    .then(result => {
      console.log('insert',result.insertedCount);
      res.send(result.insertedCount > 0);
    })
  })
  app.delete('/deleteService/:id', (req, res) => {
    const id =ObjectID(req.params.id);
    serviceCollection.deleteOne({_id: id})
    .then(result =>{
       res.send(result);
      })
});

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  
})