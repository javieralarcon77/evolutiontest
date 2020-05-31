const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const taskSchema = new Schema({
    name: { type: String },
    priority: { type: Number },
    expiration: { type: Date},
    email_user: {type: String}
}, { collection : 'task' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;