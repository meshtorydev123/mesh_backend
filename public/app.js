"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const authentication_routes_1 = require("./routes/authentication.routes");
const ormconfig_1 = __importDefault(require("./ormconfig"));
require("reflect-metadata");
const app = (0, express_1.default)();
const port = process.env.PORT;
let jwt_secret_key = process.env.JWT_SECRET_KEY;
(0, typeorm_1.createConnection)(ormconfig_1.default).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    if (connection.isConnected) {
        console.log("Postgres Connected");
    }
    app.set("port", port);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.get("/", (req, res) => {
        res.send({
            data: "meshtory  01"
        });
    });
    app.use("/user", authentication_routes_1.authrouter);
    app.listen(app.get("port"), () => {
        console.log(`your server is running on port ${app.get("port")}`);
    });
}));
