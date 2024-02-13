import { Router, Request, Response } from "express";
import fs from 'fs';

interface RouteHandler {
    path: string;
    [key: string]: ((req: Request, res: Response) => void) | string;
}

const router = Router();

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
            switch (method.toUpperCase()) {
                case 'GET':
                case 'POST':
                case 'PUT':
                case 'DELETE':
                    const methodName = method.toLowerCase() as keyof Router & string;
                    const handler = route[method] as ((req: Request, res: Response) => void);
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
