// Initilze the dotenv
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    console.log(process.env.NODE_ENV)
    config({
        path: '.env.development'
    });
} else {
    console.log(process.env.NODE_ENV)
    config();
}

// Imports
import express from 'express';

// Handlers
import middlewareHandler from './Handlers/Handler';
import routingHandler from './routing/routingHandler';

// Initilize the express app and services
const app = express();

// Initialize the handlers
middlewareHandler(app);
routingHandler(app);



// Listen to incoming requests on the port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});