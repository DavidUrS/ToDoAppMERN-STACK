//Requiring and activating the express framework for the creation of the server
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const toDoRoutes = require('./routes/to-do-routes');
const userRouter = require('./routes/user-routes');
//Importing the port of the keys file
const { port } = require('./config/keys');
//Connecting to the database
require('./config/connection');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/todos',toDoRoutes);
app.use('/user',userRouter);


//Lifting the server in the specified port
app.listen(port,()=>{
    console.log(`Server on port ${port}`)
})

