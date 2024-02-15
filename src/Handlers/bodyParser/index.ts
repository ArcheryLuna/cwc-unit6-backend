import Webserver from "../../index"
import BodyParser from "body-parser";

export default function bodyParser(client: Webserver) {
    client.app.use(BodyParser.json());
}