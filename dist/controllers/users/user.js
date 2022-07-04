"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require('bcrypt');
const { db } = require("../../src/models");
module.exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const hashedPassword = yield bcrypt.hash(password, 12);
        const newUser = yield db.user.create({
            username,
            first_name,
            last_name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ newUser });
    }
    catch (error) {
        console.log(error.message);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
module.exports.getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allusers = yield db.user.findAll({});
        res.status(200).json({ allusers });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
module.exports.getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const findUser = yield db.user.findOne({
            where: {
                userId: userId
            }
        });
        if (!userId) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ findUser });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
module.exports.updateUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const username = req.body.username;
        if (!userId) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const findUser = yield db.user.findOne({
            where: {
                userId: userId
            }
        });
        if (!findUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const updateuserName = yield db.user.update({
            username: username
        }, {
            where: {
                userId: userId,
            }
        });
        res.status(200).json({ updateuserName });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
module.exports.updateUserEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const email = req.body.email;
        if (!userId) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const findUser = yield db.user.findOne({
            where: {
                userId: userId
            }
        });
        if (!findUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const updateEmail = yield db.user.update({
            email: email
        }, {
            where: {
                userId: userId,
            }
        });
        res.status(200).json({ updateEmail: updateEmail, message: "Email updated successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
module.exports.restPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
module.exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});