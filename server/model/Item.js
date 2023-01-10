const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        // require: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        require: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    },
});


module.exports = mongoose.model('Item', ItemSchema);