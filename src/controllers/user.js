"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.updateAvatar = updateAvatar;
var mongoose_1 = require("mongoose");
var user_1 = require("../models/user");
var errorMessages_1 = require("../constants/errorMessages");
var isObjectIdValid = function (id) { return mongoose_1.default.Types.ObjectId.isValid(id); };
function getUsers(req, res) {
    return user_1.default.find({})
        .then(function (users) {
        if (!users.length) {
            res.status(404).send({ message: errorMessages_1.USER_NOT_FOUND });
            return;
        }
        res.status(200).send(users);
    })
        .catch(function (err) { return res.status(500).json(err); });
}
function getUserById(req, res) {
    var id = req.params.id;
    if (!isObjectIdValid(id)) {
        return res.status(400).send({ message: errorMessages_1.ID_INCORRECT });
    }
    return user_1.default.findById(id)
        .then(function (user) {
        if (!user) {
            res.status(404).send({ message: errorMessages_1.USER_NOT_FOUND });
            return;
        }
        res.status(200).send(user);
    })
        .catch(function (err) { return res.status(500).json(err); });
}
function createUser(req, res) {
    var _a = req.body, name = _a.name, about = _a.about, avatar = _a.avatar;
    user_1.default.create({ name: name, about: about, avatar: avatar })
        .then(function (user) { return res.status(201).send(user); })
        .catch(function (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ message: errorMessages_1.PROFILE_INCORRECT });
            return;
        }
        res.status(500).send(err);
    });
}
function updateUser(req, res) {
    var _a = req.body, name = _a.name, about = _a.about;
    var id = req.user._id;
    if (!isObjectIdValid(id)) {
        return res.status(400).send({ message: errorMessages_1.ID_INCORRECT });
    }
    return user_1.default.findByIdAndUpdate(id, { name: name, about: about }, { new: true, runValidators: true })
        .then(function (user) {
        if (!user) {
            res.status(404).send({ message: errorMessages_1.USER_NOT_FOUND });
            return;
        }
        res.status(201).send(user);
    })
        .catch(function (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ message: errorMessages_1.PROFILE_INCORRECT });
            return;
        }
        res.status(500).send(err);
    });
}
function updateAvatar(req, res) {
    var id = req.user._id;
    var avatar = req.body.avatar;
    user_1.default.findByIdAndUpdate(id, { avatar: avatar }, { new: true })
        .then(function (user) {
        if (!user) {
            res.status(404).send({ message: errorMessages_1.USER_NOT_FOUND });
            return;
        }
        res.status(201).send(user);
    })
        .catch(function (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ message: errorMessages_1.AVATAR_INCORRECT });
            return;
        }
        res.status(500).send(err);
    });
}
