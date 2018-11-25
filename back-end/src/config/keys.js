/* Exporting data that I consider important, 
it is best to put them in environment variables and delete their code values */
module.exports = {
    port: process.env.PORT || 8000,
    mongo_url: process.env.MONGO_URL || 'mongodb://prueba_condors:11111111David@ds145871.mlab.com:45871/prueba_condors'
}