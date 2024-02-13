"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Initilze the dotenv
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    console.log(process.env.NODE_ENV);
    (0, dotenv_1.config)({
        path: '.env.development'
    });
}
else {
    console.log(process.env.NODE_ENV);
    (0, dotenv_1.config)();
}
// Imports
const express_1 = __importDefault(require("express"));
// Handlers
const middlewareHandler_1 = __importDefault(require("./middleware/middlewareHandler"));
const routingHandler_1 = __importDefault(require("./routing/routingHandler"));
// Initilize the express app and services
const app = (0, express_1.default)();
// Initialize the handlers
(0, middlewareHandler_1.default)(app);
(0, routingHandler_1.default)(app);
// Listen to incoming requests on the port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
