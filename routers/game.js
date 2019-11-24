const express = require("express");
const bcrypt = require("bcrypt");
const GameRouter = express.Router();
const gameModel = require("../models/games");
const usrRatingModel = require("../models/userRatings");
const criticRatingModel = require("../models/criticsRatings");

GameRouter.post("/", (req, res) => {
    const { slug, title, cover, alt_names, genres, keywords, platforms, 
            release_dates, publishers, developers, official_site, wikia, 
            wikipedia, facebook, twitter, twitch, instagram, youtube, steam, 
            subreddit, itch, epic, gog, videos, screenshots, esrb, pegi, status
    } = req.body;
    //const hashPassword = bcrypt.hashSync(password, 12);
    gameModel.create({
        slug, title, cover, alt_names, genres, keywords, platforms,
        release_dates, publishers, developers, official_site, wikia,
        wikipedia, facebook, twitter, twitch, instagram, youtube, steam,
        subreddit, itch, epic, gog, videos, screenshots, esrb, pegi, status
    }).then(gameCreated => {
        console.log(gameCreated);
        res.status(201).json({
            success: true,
            data: gameCreated,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
});

GameRouter.get('/', (req, res) => {
    gameModel.find({})
        .then(gameList => {
            res.json({
                success: true,
                data: gameList,
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

// Get one
GameRouter.get('/:id', (req, res) => {

    gameModel.findById(req.params.id)
        .then(game => {
            usrRatingModel.aggregate([
                { $match: { _id: { $in: game.userRating } } },
                {
                    "$group": {
                        "_id": null,
                        "avgRating": { "$avg": { "$ifNull": ["$rating", 0] } }
                    }
                },
            ]).then(res => { console.log(res) });
            res.json({
                success: true,
                data: game,
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

// Update
GameRouter.put('/:id', (req, res) => {
    gameModel.findByIdAndUpdate(req.params.id, req.body)
        .then(gameUpdated => {
            res.json({
                success: true,
                data: gameUpdated,
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

// Delete
GameRouter.get('/:id', (req, res) => {
    gameModel.findByIdAndRemove(req.params.id)
        .then(gameDeleted => {
            res.json({
                success: true,
                data: gameDeleted,
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

module.exports = GameRouter;