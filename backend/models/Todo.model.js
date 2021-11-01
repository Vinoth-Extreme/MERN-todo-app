const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "No description yet."},
    completed: { type: Boolean, default: false }
}, {
    timestamps: true
})

module.exports = Todo = mongoose.model('Todo', todoSchema);