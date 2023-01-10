const mongoose = require('mongoose');
const URL = require('dotenv').config().parsed;

const connect = async() => {
    console.log(URL.MongoDbURI);
    try {
        await mongoose.connect(URL.MongoDbURI,  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Successfully Connected to Database.');
    } catch (error) {
        console.log('Failed to Connect to Database.');
        console.log(`Stack Error ${error.message}`);
        process.exit(1);
    }
}

module.exports = connect;