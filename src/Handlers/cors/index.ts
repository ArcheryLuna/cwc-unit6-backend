import Webserver from "../../index"
import Cors from "cors";

const corsOptions = {
    origin: `${process.env.CORS_ORIGIN}`,
    optionSuccessStatus: 200
}

export default function cors(client: Webserver) {
    console.log('CORS middleware enabled');
    client.app.use(Cors(corsOptions));
}