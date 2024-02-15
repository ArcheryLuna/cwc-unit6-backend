import { Request, Response } from 'express';
import { WebserverClass } from './WebserverClass';

export interface RouteHandler {
    path: string;
    [key: string]: ((req: Request, res: Response, client: WebserverClass ) => void) | string;
}

export interface Handler {
    (client: WebserverClass): void;
}

export interface RouteHandlerFunction {
    (req: Request, res: Response, client: WebserverClass): void;
}