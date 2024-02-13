// Initilze the dotenv
import { config } from 'dotenv';
config();

// Imports
import express from 'express';

// Handlers
import middlewareHandler from './middleware/middlewareHandler';
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