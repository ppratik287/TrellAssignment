var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username : String,
    password: String,
    rights: {
        type: String,
        default:0
        },
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema)