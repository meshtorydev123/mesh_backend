import dotenv from "dotenv";
dotenv.config({ path: './.env'});
import express from "express";
import socketio from "socket.io";
import { ConnectionOptions, createConnection } from "typeorm";
import {  userAuthenticationRouter } from "./routes/authentication.routes";
import config from "./ormconfig";
import "reflect-metadata";
import { postRouter } from "./routes/post.routes";
import { userSettingsRouter } from "./routes/usersettings.routes";
import { likeRouter } from "./routes/like.routes";
import { bookmarkRouter } from "./routes/bookmark.routes";
import { commentRouter } from "./routes/comment.routes";
import { userconnectionRouter } from "./routes/userconnection.routes";
import { directChatConversationRouter } from "./routes/directchatconversation.routes";
import { directChatMessageRouter } from "./routes/directchatmessage.routes";
import { publicmeshRouter } from "./routes/publicmesh.routes";






const app = express();
const port = process.env.PORT;
let http = require("http").Server(app);
let io = require("socket.io")(http);



createConnection(config as ConnectionOptions).then(async (connection) => {
    if(connection.isConnected){
        console.log("Postgres Connected");
        

    }

    app.set("port",port);
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.get("/",(req,res)=>{
    res.send({
        data:"meshtory  01"
      })
    });
    app.use("/userAuthentication",userAuthenticationRouter);
    app.use("/post",postRouter);
    app.use("/userSettings",userSettingsRouter);
    app.use("/like",likeRouter);
    app.use("/bookmark",bookmarkRouter);
    app.use("/comment",commentRouter);
    app.use("/userconnection",userconnectionRouter);
    app.use("/directchatconversation",directChatConversationRouter);
    app.use("/directchatmessage",directChatMessageRouter);
    app.use("/publicmesh",publicmeshRouter);




    io.on("connection", function(socket: any) {
      console.log("a user connected");
    });









    app.listen(app.get("port"),()=>{
      console.log(`your server is running on port ${app.get("port")}`);
    });
})



