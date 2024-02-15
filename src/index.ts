// Initilze the dotenv
import { config } from 'dotenv';
config();
import Express from 'express';
import fs from 'fs';
import { RouteHandler, Handler, RouteHandlerFunction } from './utils/types/HandlerTypes';


class Webserver  {

    app: Express.Application;
    env: NodeJS.ProcessEnv;
    middlewares: Handler[];
    expressRouter: Express.Router;
    route: RouteHandler[];

    constructor() {
        this.app = Express();
        this.env = process.env;
        this.middlewares = [];
        this.expressRouter = Express.Router();
        this.route = [];
    }

    handle404(req: Express.Request, res: Express.Response) {
        res.status(404).send('404 - Not Found');
    }

    async Handler() {
        const middlewares = this.middlewares;

        // Serach through the middleware directory and get all the folders
        const middlewareFolders = fs.readdirSync(`${__dirname}/Handlers`)
            .filter((file) => fs.lstatSync(`${__dirname}/Handlers/${file}`).isDirectory());
        for ( const dir of middlewareFolders) {
            // Get all the files in the folder
            const middlewareFiles = fs.readdirSync(`${__dirname}/Handlers/${dir}`)
                .filter((file) => file.endsWith('.ts'));
            // Import the file and add it to the middlewares array
            for (const file of middlewareFiles) {
                const middleware = await import(`./Handlers/${dir}/${file}`);
                middlewares.push(middleware.default);
            
            }
        }

    // Loop through the middlewares and add them to the app
    for (const middleware of middlewares) {
            try {
                // Add the middleware to the app
                middleware(this);
            } catch (error) {
                console.error(`Error adding middleware to the app: ${error}`);
            }
        }
    }

    async RouteHandler() {

        const routes = this.route;
        // Read all the folders in the current directory
        const routeFolders = fs.readdirSync(`${__dirname}/routing`)
            .filter((file) => fs.lstatSync(`${__dirname}/routing/${file}`).isDirectory());
        // Read all the files in the folders
        for (const dir of routeFolders) {
            // Filter the files to only include .ts files
            const routeFiles = fs.readdirSync(`${__dirname}/routing/${dir}`)
                .filter((file) => file.endsWith('.ts'));
            // Import each file and push it to the routes array
            for (const file of routeFiles) {
                const route = await import(`./routing/${dir}/${file}`);
                routes.push(route.default);
            }
        }

    // Register all the routes
    for (const route of routes) {
        // Register all the methods for each route
        for (const method in route) {
            // Register the method if it is a valid HTTP method
            switch (method.toUpperCase()) {
                case 'GET':
                case 'POST':
                case 'PUT':
                case 'DELETE': {
                    // Get the method name and handler
                    const methodName = method.toLowerCase() as keyof Express.Router & string;
                    // Register the handler
                    const handler = route[method] as RouteHandlerFunction;
                    // Register the handler if it is a function
                    if (typeof handler === 'function') {
                        (this.app as any)[methodName](route.path, handler);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    this.app.use(this.handle404);
}

start() {
    this.Handler();
    this.RouteHandler();

    this.app.listen(this.env.PORT, () => {
            console.log(`Server is running on port ${this.env.PORT}`);
        });
    }
}

new Webserver().start();

export default Webserver;
