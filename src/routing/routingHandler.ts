import { Router, Request, Response } from "express";
import fs from 'fs';
import { RouteHandler } from "../utils/types/RouteHandlerTypes";

function getRoutes(): RouteHandler[] {
    var routes: RouteHandler[] = [];

    const routeFolders = fs.readdirSync(__dirname).filter((file) => fs.lstatSync(`${__dirname}/${file}`).isDirectory());
    for (var dir of routeFolders) {
        const routeFiles = fs.readdirSync(`${__dirname}/${dir}`).filter((file) => file.endsWith('.ts'));
        for (var file of routeFiles) {
            const route: RouteHandler = require(`./${dir}/${file}`).default;
            routes.push(route);
        }
    }

    return routes;
}

function handle404(req: Request, res: Response) {
    res.status(404).send("404 - Not Found");
}

export default function routingHandler(app: Router) {
    const routes = getRoutes();

    for (const route of routes) {
        for (const method in route) {
            if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'DELETE') {
                const methodName = method.toLowerCase() as keyof Router & string;
                const handler = route[method] as ((req: Request, res: Response) => void);
                if (typeof handler === 'function') {
                    (app as any)[methodName](route.path, handler);
                }
            }
        }
    }

    // Register the 404 handler after all other routes
    app.use(handle404);
}
