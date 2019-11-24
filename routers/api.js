const express = require("express");
const APIRouter = express.Router();
const UserRouter = require("./user");
const GameRouter = require("./game");
const AuthRouter = require("./auth");
const criticsRatingRouter = require("./criticRating");
const userRatingRouter = require("./userRating");

APIRouter.get("/", (req,res) => {
    res.send("API");
})

APIRouter.use("/user", UserRouter);
APIRouter.use("/game", GameRouter);
APIRouter.use("/auth", AuthRouter);
APIRouter.use("/userreview", userRatingRouter);
APIRouter.use("/criticreview", criticsRatingRouter);

module.exports = APIRouter;