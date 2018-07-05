import * as Http from "http";
import * as Socket from "./node_modules/@types/socket.io";

const server: Http.Server = Http.createServer(serverInit);


function serverInit(): void { }
