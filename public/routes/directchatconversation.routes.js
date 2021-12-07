"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directChatConversationRouter = void 0;
const express_1 = __importDefault(require("express"));
const directchatconversation_controller_1 = require("../controllers/directchatconversation.controller");
const directChatConversationRouter = (0, express_1.default)();
exports.directChatConversationRouter = directChatConversationRouter;
directChatConversationRouter.post("/startDirectChatConversation", directchatconversation_controller_1.DirectChatConversationController.startDirectChatConversation);
