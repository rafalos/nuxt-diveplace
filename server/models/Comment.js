var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    author: String,
    text: String,
    date: String,
    authorPhoto: String
})

module.exports = mongoose.model("Comment", commentSchema);