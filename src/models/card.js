"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var cardSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
        ref: 'user',
    },
    likes: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
            default: [],
        }],
});
exports.default = mongoose_1.default.model('card', cardSchema);
