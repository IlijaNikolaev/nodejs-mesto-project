"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var user_1 = require("./routes/user");
var card_1 = require("./routes/card");
var app = (0, express_1.default)();
var port = 3000;
mongoose_1.default.connect('mongodb://localhost:27017/mestodb');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    req.user = {
        _id: '68b0043352d6b98e4e781ddd' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };
    next();
});
app.use(user_1.default);
app.use(card_1.default);
app.get('/', function (req, res) {
    console.log('get request');
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Listening on port ' + port);
});
