import { Request, Response } from 'express';

export default {
    path: '/',
    GET(req: Request, res: Response) {
        res.status(200).send('Hello, world!');
    },
    POST(req: Request, res: Response) {
        res.status(200).send('Hello, world!');
    },
    PUT(req: Request, res: Response) {
        res.status(200).send('Hello, world!');
    },
    DELETE(req: Request, res: Response) {
        res.status(200).send('Hello, world!');
    }
}