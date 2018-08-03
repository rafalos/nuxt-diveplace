var mongoose = require("mongoose");

var reportSchema = mongoose.Schema({
    diveplace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diveplace"
    },
    author: String,
    date: String,
    reason: String,
    description: String
})

module.exports = mongoose.model("Report", reportSchema);