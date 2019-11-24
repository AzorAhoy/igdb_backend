const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    cover: {
        type: String,
        default: "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover_qhhlj6.jpg"
        //require: true
    },

    summary: String,
    storyline: String,
    alt_names: [String],
    genres: [String],
    keywords: [String],
    platforms: [String],
    release_dates: [{
        platform: String,
        region: String,
        date: Date
    }],
    publishers: [String],
    developers:[String],
    // websites: {
    //     official: String,
    //     wikia: String,
    //     wikipedia: String,
    //     facebook: String,
    //     twitter: String,
    //     twitch: String,
    //     instagram: String,
    //     youtube: String,
    //     steam: String,
    //     subreddit: String,
    //     itch: String,
    //     epic: String,
    //     gog: String,
    // },
    official_site: String,
    wikia: String,
    wikipedia: String,
    facebook: String,
    twitter: String,
    twitch: String,
    instagram: String,
    youtube: String,
    steam: String,
    subreddit: String,
    itch: String,
    epic: String,
    gog: String,
    videos: [String],
    screenshots:[String],
    esrb:{
        rating: String,
        themes:[String]
    },
    pegi:{
        rating: Number,
        themes:[String]
    },
    status: String,
    userRating: [{
        type: Schema.Types.ObjectId,
        ref: "UserRating"
    }],
    criticRating: [{
        type: Schema.Types.ObjectId,
        ref: "CriticRating"
    }]
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Game", GameSchema)