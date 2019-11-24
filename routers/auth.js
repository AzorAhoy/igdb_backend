const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const AuthRouter = express.Router();

const jwtSecret = "sadu&^123i897au&Y*&";

const userModel = require('../models/users');

// Authentication
// Login
AuthRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({ success: 0, message: 'Thiếu username hoặc password!' });
    }

    userModel.findOne({ username })
        .then(userFound => {
            if (!userFound || !userFound._id) {
                res.json({ success: 0, message: 'Không tồn tại người dùng có username này!' });
            } else {
                if (bcrypt.compareSync(password, userFound.password)) {
                    const access_token = jwt.sign({ username, id: userFound._id }, jwtSecret)

                    res.json({
                        success: 1,
                        message: 'Đăng nhập thành công!',
                        access_token,
                        user: {
                            username,
                            id: userFound._id,
                            role: userFound.role
                        }
                    });
                } else {
                    res.json({ success: 0, message: 'Sai mật khẩu!' });
                }
            }
        }).catch(err => {
            res.json({ success: 0, message: 'Đã có lỗi xảy ra!' });
        });
});

AuthRouter.get('/check', (req, res) => {
    const access_token = req.query.access_token;
    // console.log(access_token);
    //console.log(req.session);

    if (access_token && jwt.verify(access_token, jwtSecret)) {
        res.send({
            success: 1,
            message: 'Người dùng đã đăng nhập',
            user: jwt.verify(access_token, jwtSecret)
        });
    } else {
        res.send({
            success: 0,
            message: 'Người dùng chưa đăng nhập'
        });
    }
});

module.exports = AuthRouter;