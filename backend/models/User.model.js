const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true, minLength: 5 },
    dp: { type: String, required: false, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', userSchema);