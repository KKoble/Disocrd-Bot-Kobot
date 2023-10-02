const mongo = require("mongoose")
const commaNumber = require('comma-number');

const d = new mongo.Schema({
    money: { type: Number },
    userid: { type: String },
    date: { type: String }
})

const MessageModel = module.exports = mongo.model("도박", d);