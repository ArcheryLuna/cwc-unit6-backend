import { Router, Request, Response } from "express";
import fs from 'fs';
import { RouteHandler } from "../utils/types/RouteHandlerTypes";

function getRoutes(): RouteHandler[] {

    // Store the routes in the routes array
    var routes: RouteHandler[] = [];

    // Read all the folders in the current directory
    const routeFolders = fs.readdirSync(__dirname).filter((file) => fs.lstatSync(`${__dirname}/${file}`).isDirectory());
    // Read all the files in the folders
    for (var dir of routeFolders) {
        // Filter the files to only include .ts files
        const routeFiles = fs.readdirSync(`${__dirname}/${dir}`).filter((file) => file.endsWith('.ts'));
        // Import each file and push it to the routes array
        for (var file of routeFiles) {
            const route: RouteHandler = require(`./${dir}/${file}`).default;
            routes.push(route);
        }
    }

    // Return the routes array
    return routes;
}

// just incase the route is not found
function handle404(req: Request, res: Response) {
    res.status(404).send("404 - Not Found");
}

export default function routingHandler(app: Router) {

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
                    const methodName = method.toLowerCase() as keyof Router & string;
                    // Register the handler
                    const handler = route[method] as ((req: Request, res: Response) => void);
                    // Register the handler if it is a function
                    if (typeof handler === 'function') {
                        (app as any)[methodName](route.path, handler);
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
