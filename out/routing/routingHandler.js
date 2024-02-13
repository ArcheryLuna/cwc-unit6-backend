"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function getRoutes() {
    // Store the routes in the routes array
    var routes = [];
    // Read all the folders in the current directory
    const routeFolders = fs_1.default.readdirSync(__dirname).filter((file) => fs_1.default.lstatSync(`${__dirname}/${file}`).isDirectory());
    // Read all the files in the folders
    for (var dir of routeFolders) {
        // Filter the files to only include .ts files
        const routeFiles = fs_1.default.readdirSync(`${__dirname}/${dir}`).filter((file) => file.endsWith('.ts'));
        // Import each file and push it to the routes array
        for (var file of routeFiles) {
            const route = require(`./${dir}/${file}`).default;
            routes.push(route);
        }
    }
    // Return the routes array
    return routes;
}
// just incase the route is not found
function handle404(req, res) {
    res.status(404).send("404 - Not Found");
}
function routingHandler(app) {
    // Get all the routes
    const routes = getRoutes();
    // Register all the routes
    for (const route of routes) {
        // Register all the methods for each route
        for (const method in route) {
            // Register the method if it is a valid HTTP method
            switch (method.toUpperCase()) {
                case 'GET':
                case 'POST':
                case 'PUT':
                case 'DELETE':
                    // Get the method name and handler
                    const methodName = method.toLowerCase();
                    // Register the handler
                    const handler = route[method];
                    // Register the handler if it is a function
                    if (typeof handler === 'function') {
                        app[methodName](route.path, handler);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    // Register the 404 handler after all other routes
    app.use(handle404);
}
exports.default = routingHandler;
