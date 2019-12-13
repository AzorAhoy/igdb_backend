const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const criticsRatingRouter = express.Router();
const criticsRatingModel = require("../models/criticsRatings");

criticsRatingRouter.post("/", (req, res) => {
    const { game, sitename, rating, url } = req.body;
    //const hashPassword = bcrypt.hashSync(password, 12);
    criticsRatingModel.create({ game, sitename, rating, url }).then(criticsRatingCreated => {
        console.log(criticsRatingCreated);
        res.status(201).json({
            success: true,
            data: criticsRatingCreated,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
});

criticsRatingRouter.get('/', (req, res) => {
    // criticsRatingModel.find({})
    //     .then(criticsRatingList => {
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

    criticsRatingModel.aggregate([
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
        res.status(500).json({
            success: true,
            result,
        });
    })
});

// Get one
// criticsRatingRouter.get('/:id', (req, res) => {
//     criticsRatingModel.findById(req.params.id)
//         .populate("Game", {
//             _id: 0
//         })
//         .then(criticsRating => {
//             res.json({
//                 success: true,
//                 data: criticsRating,
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
criticsRatingRouter.get('/:gameid', (req, res) => {
    criticsRatingModel.find({ game: req.params.gameid })
        .populate("Game", {
            _id: 0
        })
        .then(criticsRating => {
            var ids = req.params.gameid;

            //console.log(ids);
            criticsRatingModel.aggregate([
                // { "$match": { game: { $in: game } } },
                { "$match": { game: mongoose.Types.ObjectId(ids) } },
                {
                    "$group": {
                        "_id": "$game",
                        "avgRating": { "$avg": "$rating" }
                    }
                },
            ]).then(result => {
                console.log(res);
                console.log(result[0].avgRating);
                avgScore = result[0].avgRating;
                res.json({
                    success: true,
                    data: criticsRating,
                    avgCriticRating: avgScore
                });
            })
            // res.json({
            //     success: true,
            //     data: criticsRating,
            // });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

// Update
criticsRatingRouter.put('/:id', (req, res) => {
    criticsRatingModel.findByIdAndUpdate(req.params.id, req.body)
        .then(criticsRatingUpdated => {
            res.json({
                success: true,
                data: criticsRatingUpdated,
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
criticsRatingRouter.get('/:id', (req, res) => {
    criticsRatingModel.findByIdAndRemove(req.params.id)
        .then(criticsRatingDeleted => {
            res.json({
                success: true,
                data: criticsRatingDeleted,
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

module.exports = criticsRatingRouter;