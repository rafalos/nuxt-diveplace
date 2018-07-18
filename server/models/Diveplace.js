const mongoose = require("mongoose");

var diveplaceSchema = new mongoose.Schema({
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
    road: Boolean,
    recommend: Number,
    published: {type: Boolean, default: false},
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
	watchersNumber: Number,
	watchersNicknames: []
})

module.exports = mongoose.model("Diveplace", diveplaceSchema);
