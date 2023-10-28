import web from "./app/web.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
web.listen(port);
