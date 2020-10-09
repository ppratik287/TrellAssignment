var mongoose = require("mongoose")

var movieSchema = new mongoose.Schema({
    name : { type: String, unique: true },
    description: String,
    duration: String,
    direction: String,
    time: String,
    price: Number,
    tickets: {type: Number, default: 200}
})

module.exports = mongoose.model("Movie", movieSchema)