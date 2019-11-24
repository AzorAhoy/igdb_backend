const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEkHz-xRJmIvWAHQHFocosvA5DepYi_XApN55bIsFvKEcDzz57A&s"
    },

    password: {
        type: String,
        require: true
    },
    //role = 0: admin. role = 1: user
    role: {
        type: Number,
        required: true
    },

    want: [{
        type: Schema.Types.ObjectId,
        ref: "Game"
    }],
    playing: [{
        type: Schema.Types.ObjectId,
        ref: "Game"
    }],
    played: [{
        type: Schema.Types.ObjectId,
        ref: "Game"
    }],
})

module.exports = mongoose.model("User", UserSchema);