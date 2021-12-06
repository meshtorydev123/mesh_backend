import Router from "express";
import { DirectChatMessageController } from "../controllers/directchatmessage.controller";
const directChatMessageRouter = Router();

directChatMessageRouter.post("/sendDirectChatMessage",DirectChatMessageController.sendDirectMessage);


 

export {directChatMessageRouter};