import { Router } from 'express';
import fs from 'fs';

function getMiddlewares() {
    // Search through the src/middleware directory and get all the folders
    // Then get all the files in each folder
    // Then import the file and return it

    var middlewares = [];

    // Serach through the middleware directory and get all the folders
    const middlewareFolders = fs.readdirSync(__dirname).filter((file) => fs.lstatSync(`${__dirname}/${file}`).isDirectory());
    for ( var dir of middlewareFolders) {
        // Get all the files in the folder
        const middlewareFiles = fs.readdirSync(`${__dirname}/${dir}`).filter((file) => file.endsWith('.ts'));
        // Import the file and add it to the middlewares array
        for (var file of middlewareFiles) {
            const middleware = require(`./${dir}/${file}`).default;
            middlewares.push(middleware);
        }
    }

    // Return the middlewares array
    return middlewares;
}

export default function middlewareHandler(app: Router) {
    // Get all the middlewares
    var middlewares = getMiddlewares();

    // Loop through the middlewares and add them to the app
    for (var middleware of middlewares) {
        // Add the middleware to the app
        middleware(app);
    }
}