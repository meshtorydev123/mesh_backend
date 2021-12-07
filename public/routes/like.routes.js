"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRouter = void 0;
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("../controllers/like.controller");
const likeRouter = (0, express_1.default)();
exports.likeRouter = likeRouter;
likeRouter.post("/addLike", like_controller_1.LikeController.addLike);
