var mongoose = require("mongoose");

var reportSchema = mongoose.Schema({
    id: String,
    author: String,
    date: String,
    type: String,
    comment: String
})

module.exports = mongoose.model("Report", reportSchema);