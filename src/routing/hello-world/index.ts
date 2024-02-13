import { Request, Response } from 'express';

export default {
    path: '/',
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