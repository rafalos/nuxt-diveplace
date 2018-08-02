var mongoose = require("mongoose");

var reportSchema = mongoose.Schema({
    id: String,
    author: String,
    date: String,
    reason: String,
    description: String
})

module.exports = mongoose.model("Report", reportSchema);