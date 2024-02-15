import Express from 'express';

export interface WebserverClass {
    app: Express.Application;
    env: NodeJS.ProcessEnv;
}

export interface ExpressClass {
    Application : Express.Application,
    Request: Express.Request,
    Response: Express.Response,
    NextFunction: Express.NextFunction,
    Router: Express.Router
}