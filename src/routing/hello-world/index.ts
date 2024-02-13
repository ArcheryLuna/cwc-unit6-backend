/** routing/hello-world/index.ts is a template file for each other route */

import { Request, Response } from 'express';

export default {
    // The path of the route
    path: '/',
    // The handlers for the route
    GET(req: Request, res: Response) {
        res.status(200).send('Hello, world! GET');
    },
    POST(req: Request, res: Response) {
        res.status(200).send('Hello, world! POST');
    },
    PUT(req: Request, res: Response) {
        res.status(200).send('Hello, world! PUT');
    },
    DELETE(req: Request, res: Response) {
        res.status(200).send('Hello, world! DELETE');
    }
}