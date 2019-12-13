const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userRatingRouter = express.Router();
const userRatingModel = require("../models/userRatings");

userRatingRouter.post("/", (req, res) => {
    const { user, game, review, rating, pros, cons } = req.body;
    //const hashPassword = bcrypt.hashSync(password, 12);
    userRatingModel.create({ user, game, review, rating, pros, cons }).then(userRatingCreated => {
        console.log(userRatingCreated);
        res.status(201).json({
            success: true,
            data: userRatingCreated,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
});

userRatingRouter.get('/', (req, res) => {
    // userRatingModel.find({})
    //     .then(userRatingList => {
    //         res.json({
    //             success: true,
    //             data: gameList,
    //         });
    //     }).catch(error => {
    //         console.log(error);
    //         res.status(500).json({
    //             success: false,
    //             error,
    //         });
    //     });
    userRatingModel.aggregate([
        // { "$match": { game: { $in: game } } },
        // { "$match": { game: mongoose.Types.ObjectId(ids) } },
        {
            "$group": {
                "_id": "$game",
                "avgRating": { "$avg": "$rating" }
            }
        },
    ]).then(result => {
        console.log(result);
        res.json({
            success: true,
            result,
        });
    })
});

// // Get one
// userRatingRouter.get('/:id', (req, res) => {
//     userRatingModel.findById(req.params.id)
//         .populate("Game", {
//             _id: 0
//         })
//         .then(userRating => {
//             res.json({
//                 success: true,
//                 data: userRating,
//             });
//         }).catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 success: false,
//                 error,
//             });
//         });
// });

// Get reviews for 1 game
userRatingRouter.get('/:gameid', (req, res) => {
    var avgScore = 0;
    userRatingModel.find({ game: req.params.gameid })
        .populate("game", {
            _id: 0
        })
        .populate("user", {
            _id: 0
        })
        .then(userRating => {
            var ids = req.params.gameid;

            //console.log(ids);
            userRatingModel.aggregate([
                // { "$match": { game: { $in: game } } },
                { "$match": { game: mongoose.Types.ObjectId(ids) } },
                {
                    "$group": {
                        "_id": "$game",
                        "avgRating": { "$avg": "$rating" }
                    }
                },
            ]).then(result => {
                console.log(result[0].avgRating);
                avgScore = result[0].avgRating;
                res.json({
                    success: true,
                    data: userRating,
                    avgUserRating: avgScore
                });
            }).catch(err => { console.log(err) });

        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

// Update
userRatingRouter.put('/:id', (req, res) => {
    userRatingModel.findByIdAndUpdate(req.params.id, req.body)
        .then(userRatingUpdated => {
            res.json({
                success: true,
                data: userRatingUpdated,
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
userRatingRouter.get('/:id', (req, res) => {
    userRatingModel.findByIdAndRemove(req.params.id)
        .then(userRatingDeleted => {
            res.json({
                success: true,
                data: userRatingDeleted,
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

module.exports = userRatingRouter;