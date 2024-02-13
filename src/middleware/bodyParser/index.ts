import { Router } from "express";

export default function bodyParser(app: Router) {
    app.use(require('body-parser').json());
}