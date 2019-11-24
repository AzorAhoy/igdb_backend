const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CriticRatingSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Gane"
    },

    sitename: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        default: 0,
        required: true
    },

    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    
}
);

module.exports = mongoose.model("CriticRating", CriticRatingSchema);