//Importing 'mongoose' and 'Schema' to use to create the schema model
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
//Importing 'moment-timezone' to handle the current date and time.
const moment = require('moment-timezone');
//Formatting the date to Bogota/Colombia and saving it in the variable 'date'
moment.tz.setDefault("America/Bogota");
let date = moment().tz("America/Bogota").format();

//Creating the schema for the user
const userSchema = new Schema({
    _id: {type:Schema.Types.ObjectId, refPath:'todos._id'},
    name: {type: String, trim: true},
    lastname : {type: String, trim: true},
    creation_date: {type: Date, default: date}
});

//Creating the model of user schema
const doModel = mongoose.model('users',userSchema);

//Exporting the model
module.exports = doModel;