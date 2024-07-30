import express from 'express'
import cors from 'cors'
import data from './data.js'
import mongoose from 'mongoose';
import config from './config.js';

//connect to MongoDB
mongoose.connect(config.MONGODB_URL)
.then(() => {
    console.log('Connected to mongodb');
}).catch((error) => {
    console.error('Failed to connect to MongoDB', error)
})

const app = express();

app.use(cors());
app.get('/api/products', (req, res) => {
    res.send(data.products);
}) 

app.get('/api/products/:id', (req, res) => {
   const product = data.products.find((p) => p._id === req.params.id);
   if (product) {
    res.send(product);
   } else {
    res.status(404).send({message: 'Product not found'});
   }
})

app.listen(5000, () => {
    console.log('Serve at http://localhost:5000');
})



