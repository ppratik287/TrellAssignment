
var mongoose = require("mongoose")

var timeSchema = new mongoose.Schema({
    name : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    time: [{
        slots: String,
    }],
    price: Number,
    tickets: {type: Number, default: 200}

    
})

module.exports = mongoose.model("Time", timeSchema)


