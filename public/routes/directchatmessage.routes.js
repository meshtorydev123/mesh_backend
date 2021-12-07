"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directChatMessageRouter = void 0;
const express_1 = __importDefault(require("express"));
const directchatmessage_controller_1 = require("../controllers/directchatmessage.controller");
const directChatMessageRouter = (0, express_1.default)();
exports.directChatMessageRouter = directChatMessageRouter;
directChatMessageRouter.post("/sendDirectChatMessage", directchatmessage_controller_1.DirectChatMessageController.sendDirectMessage);
