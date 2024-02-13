"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function getMiddlewares() {
    // Search through the src/middleware directory and get all the folders
    // Then get all the files in each folder
    // Then import the file and return it
    var middlewares = [];
    // Serach through the middleware directory and get all the folders
    const middlewareFolders = fs_1.default.readdirSync(__dirname).filter((file) => fs_1.default.lstatSync(`${__dirname}/${file}`).isDirectory());
    for (var dir of middlewareFolders) {
        // Get all the files in the folder
        const middlewareFiles = fs_1.default.readdirSync(`${__dirname}/${dir}`).filter((file) => file.endsWith('.ts'));
        // Import the file and add it to the middlewares array
        for (var file of middlewareFiles) {
            const middleware = require(`./${dir}/${file}`).default;
            middlewares.push(middleware);
        }
    }
    // Return the middlewares array
    return middlewares;
}
function middlewareHandler(app) {
    // Get all the middlewares
    var middlewares = getMiddlewares();
    // Loop through the middlewares and add them to the app
    for (var middleware of middlewares) {
        try {
            // Add the middleware to the app
            middleware(app);
        }
        catch (error) {
            console.error(`Error adding middleware to the app: ${error}`);
        }
    }
}
exports.default = middlewareHandler;
