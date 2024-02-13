import { Router } from "express";

const router = Router();

var corsOptions = {
    origin: `${process.env.CORS_ORIGIN}`,
    optionSuccessStatus: 200
}

export default function cors(app: Router) {
    console.log('CORS middleware enabled');
    app.use(require('cors')(corsOptions));
}