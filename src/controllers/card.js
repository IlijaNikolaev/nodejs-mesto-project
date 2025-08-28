"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeCard = exports.likeCard = exports.deleteCardById = exports.getCards = exports.createCard = void 0;
var mongoose_1 = require("mongoose");
var card_1 = require("../models/card");
var errorMessages_1 = require("../constants/errorMessages");
var isObjectIdValid = function (id) { return mongoose_1.default.Types.ObjectId.isValid(id); };
var createCard = function (req, res) {
    var _a = req.body, name = _a.name, link = _a.link;
    var _id = req.user._id;
    card_1.default.create(({ name: name, link: link, owner: _id }))
        .then(function (card) { return res.status(201).send(card); })
        .catch(function (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ message: errorMessages_1.CARD_INCORRECT });
            return;
        }
        res.status(500).send(err);
    });
};
exports.createCard = createCard;
var getCards = function (req, res) {
    card_1.default.find({})
        .then(function (cards) { return res.status(200).send(cards); })
        .catch(function (err) { return res.status(500).send(err); });
};
exports.getCards = getCards;
var deleteCardById = function (req, res) {
    var _id = req.params.id;
    return card_1.default.findByIdAndDelete({ _id: _id })
        .then(function (card) {
        if (!card) {
            res.status(404).send({ message: errorMessages_1.CARD_NOT_FOUND });
        }
        res.status(200).send(card);
    })
        .catch(function (err) { return res.status(500).send(err); });
};
exports.deleteCardById = deleteCardById;
var likeCard = function (req, res) {
    var _id = req.user._id;
    var cardId = req.params.cardId;
    if (!isObjectIdValid(cardId)) {
        return res.status(400).send({ message: errorMessages_1.ID_INCORRECT });
    }
    return card_1.default.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
        .then(function (card) {
        if (!card) {
            res.status(404).send({ message: errorMessages_1.CARD_NOT_FOUND });
        }
        res.status(200).send(card);
    })
        .catch(function (err) { return res.status(500).send(err); });
};
exports.likeCard = likeCard;
var unlikeCard = function (req, res) {
    var _id = req.user._id;
    var cardId = req.params.cardId;
    if (!isObjectIdValid(cardId)) {
        return res.status(400).send({ message: errorMessages_1.ID_INCORRECT });
    }
    return card_1.default.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
        .then(function (card) {
        if (!card) {
            res.status(404).send({ message: errorMessages_1.CARD_NOT_FOUND });
        }
        res.status(200).send(card);
    })
        .catch(function (err) { return res.status(500).send(err); });
};
exports.unlikeCard = unlikeCard;
