//Importing 'mongoose' and 'Schema' to use to create the schema model
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
//Importing 'moment-timezone' to handle the current date and time.
const moment = require('moment-timezone');
//Formatting the date to Bogota/Colombia and saving it in the variable 'date'
moment.tz.setDefault("America/Bogota");
let date = moment().tz("America/Bogota").format();

var enumStatus = ['Open', 'In-Progress', 'Completed', 'Archived']

const doSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {type: String, trim: true},
    description : {type: String, trim: true},
    date: {type: Date},
    creation_date: {type: Date, default: date},
    status: {type: String, enum:enumStatus},
    user: {type: Schema.Types.ObjectId, ref:'users _id'}
},{ toJSON:{virtuals: true}, toObject: { virtuals: true } });

doSchema.virtual('userVirtual',{
    ref: 'users',
    localField: 'user',
    foreignField: '_id',
    justOne: false
})



const doModel = mongoose.model('todos',doSchema);
module.exports = doModel;