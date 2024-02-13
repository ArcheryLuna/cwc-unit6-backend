"use strict";
/** routing/hello-world/index.ts is a template file for each other route */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // The path of the route
    path: '/',
    // The handlers for the route
    GET(req, res) {
        res.status(200).send('Hello, world! GET');
    },
    POST(req, res) {
        res.status(200).send('Hello, world! POST');
    },
    PUT(req, res) {
        res.status(200).send('Hello, world! PUT');
    },
    DELETE(req, res) {
        res.status(200).send('Hello, world! DELETE');
    }
};
