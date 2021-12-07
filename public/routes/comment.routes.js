"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const commentRouter = (0, express_1.default)();
exports.commentRouter = commentRouter;
commentRouter.post("/addRootComment", comment_controller_1.CommentController.addRootComment);
commentRouter.post("/addReplyComment", comment_controller_1.CommentController.addReplyComment);
