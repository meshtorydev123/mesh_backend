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
const post_routes_1 = require("./routes/post.routes");
const usersettings_routes_1 = require("./routes/usersettings.routes");
const like_routes_1 = require("./routes/like.routes");
const bookmark_routes_1 = require("./routes/bookmark.routes");
const comment_routes_1 = require("./routes/comment.routes");
const userconnection_routes_1 = require("./routes/userconnection.routes");
const directchatconversation_routes_1 = require("./routes/directchatconversation.routes");
const directchatmessage_routes_1 = require("./routes/directchatmessage.routes");
const publicmesh_routes_1 = require("./routes/publicmesh.routes");
const app = (0, express_1.default)();
const port = process.env.PORT;
let http = require("http").Server(app);
let io = require("socket.io")(http);
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
    app.use("/userAuthentication", authentication_routes_1.userAuthenticationRouter);
    app.use("/post", post_routes_1.postRouter);
    app.use("/userSettings", usersettings_routes_1.userSettingsRouter);
    app.use("/like", like_routes_1.likeRouter);
    app.use("/bookmark", bookmark_routes_1.bookmarkRouter);
    app.use("/comment", comment_routes_1.commentRouter);
    app.use("/userconnection", userconnection_routes_1.userconnectionRouter);
    app.use("/directchatconversation", directchatconversation_routes_1.directChatConversationRouter);
    app.use("/directchatmessage", directchatmessage_routes_1.directChatMessageRouter);
    app.use("/publicmesh", publicmesh_routes_1.publicmeshRouter);
    io.on("connection", function (socket) {
        console.log("a user connected");
    });
    app.listen(app.get("port"), () => {
        console.log(`your server is running on port ${app.get("port")}`);
    });
}));
