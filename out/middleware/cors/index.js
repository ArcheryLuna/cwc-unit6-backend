"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
var corsOptions = {
    origin: `${process.env.CORS_ORIGIN}`,
    optionSuccessStatus: 200
};
function cors(app) {
    console.log('CORS middleware enabled');
    app.use(require('cors')(corsOptions));
}
exports.default = cors;
