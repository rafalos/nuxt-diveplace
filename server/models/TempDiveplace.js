const mongoose = require("mongoose");

var tempDiveplaceSchema = new mongoose.Schema({
    name: String,
    image: [],
    description: String,
    depth: Number,
    createdBy: String,
    attentions: String,
    sight: Number,
    height: Number,
    surface: String,
    lat: Number,
    lng: Number,
    country: String,
    base: Boolean,
    coral: Boolean,
    garbage: Boolean,
    road: Boolean
})

module.exports = mongoose.model("TempDiveplace", tempDiveplaceSchema);