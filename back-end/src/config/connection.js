/* Importando mongoose como manejador de la base de datos MongoDB. 
I am using mLab as a service for the MongoDB database*/
const mongoose = require('mongoose');
// Exporting the address of the mongo database
const { mongo_url } = require('./keys');

//Trying to connect to the database, if it does not connect it will send an error message
mongoose.connect(mongo_url,{
    useNewUrlParser: true 
}).then(()=>{
    console.log('Connected to the database');
}).catch((err)=>{
    console.log('Error connecting to the database'+err);
})