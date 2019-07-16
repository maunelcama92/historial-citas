const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    nombre: {
        type: String
    },
    numero_canal: {
        type: String
    },
    HD: {
        type: String
    }
}, {
    collection: 'canales'
});

module.exports = mongoose.model('Task', TaskSchema);