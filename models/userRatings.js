const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    game: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Game"
    },

    review: {
        type: String,
        required: true
    },

    pros: [{
        type: String,
        require: true
    }],
    //role = 0: admin. role = 1: user
    cons: [{
        type: String,
        required: true
    }],

    rating: {
        type: Number,
        default: 0,
        required: true
    },
    helpful: {
        type: Number,
        //default: 0
    }
    //0-false,1-true
}, {
    timestamps: true,
})

module.exports = mongoose.model("UserRating", UserRatingSchema);