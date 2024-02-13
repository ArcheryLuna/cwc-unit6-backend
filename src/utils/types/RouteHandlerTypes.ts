import { Request, Response } from 'express';

export interface RouteHandler {
    path: string;
    [key: string]: ((req: Request, res: Response) => void) | string;
}