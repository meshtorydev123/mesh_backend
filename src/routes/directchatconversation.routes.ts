import Router from "express";
import { DirectChatConversationController } from "../controllers/directchatconversation.controller";
const directChatConversationRouter = Router();

directChatConversationRouter.post("/startDirectChatConversation",DirectChatConversationController.startDirectChatConversation);


 

export {directChatConversationRouter};