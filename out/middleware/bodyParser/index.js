"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bodyParser(app) {
    app.use(require('body-parser').json());
}
exports.default = bodyParser;
