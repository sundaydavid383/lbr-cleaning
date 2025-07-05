const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    email:{
        required: true,
        type: String,
        unique: true,
    },
    subscribeAt:{
        type: Date,
        default: Date.now,
    }
})

const Subscribers = mongoose.models.Subscribers || mongoose.model("Subscribers", EmailSchema);

module.exports = Subscribers