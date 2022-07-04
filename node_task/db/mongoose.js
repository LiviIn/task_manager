// this file will handle connection login to the MongoDB database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', {
    useNewUrlParser: true
}).then(() =>{
    console.log('connected to mongoDB successfully');
}).catch((err) =>{
    console.log('Error while attempting to connect to mongoDB', err)
});

module.exports = {
    mongoose
}