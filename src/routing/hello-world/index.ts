/** routing/hello-world/index.ts is a template file for each other route */

import { Request, Response } from 'express';
import Webserver from "../../index"

export default {
    // The path of the route
    path: '/',
    // The handlers for the route
    GET(req: Request, res: Response, client: Webserver) {
        res.status(200).send(`Hello, world! GET`);
    },
    // eslint-disable-next-line no-unused-vars
    POST(req: Request, res: Response, client: Webserver) {
        res.status(200).send('Hello, world! POST');
    },
    // eslint-disable-next-line no-unused-vars
    PUT(req: Request, res: Response, client: Webserver) {
        res.status(200).send('Hello, world! PUT');
    },
    // eslint-disable-next-line no-unused-vars
    DELETE(req: Request, res: Response, client: Webserver) {
        res.status(200).send('Hello, world! DELETE');
    }
}