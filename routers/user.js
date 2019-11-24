const express = require("express");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const userModel = require("../models/users");

UserRouter.post("/", (req, res) => {
    const { username, password, email, avatar, role, want, playing, played } = req.body;
    const hashPassword = bcrypt.hashSync(password, 12);
    userModel.create({ username, password: hashPassword, email, avatar, role, want, playing, played }).then(userCreated => {
        console.log(userCreated);
        res.status(201).json({
            success: true,
            data: userCreated,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        })
    })
});

UserRouter.get('/', (req, res) => {
    userModel.find({})
        .then(userList => {
            res.json({
                success: true,
                data: userList,
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
UserRouter.get('/:id', (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            res.json({
                success: true,
                data: user,
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
UserRouter.put('/:id', (req, res) => {
    const { username, password, email, avatar, role, want, playing, played } = req.body;
    const hashPassword = bcrypt.hashSync(password, 12);
    userModel.findByIdAndUpdate(req.params.id, { username, password: hashPassword, email, avatar, role, want, playing, played })
        .then(userUpdated => {
            res.json({
                success: true,
                data: userUpdated,
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
UserRouter.get('/:id', (req, res) => {
    userModel.findByIdAndRemove(req.params.id)
        .then(userDeleted => {
            res.json({
                success: true,
                data: userDeleted,
            });
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        });
});

module.exports = UserRouter;