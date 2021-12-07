"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const postRouter = (0, express_1.default)();
exports.postRouter = postRouter;
postRouter.post("/addPost_userWall", post_controller_1.PostController.addPostonUserWall);
postRouter.get("/fetchposts", post_controller_1.PostController.fetchPosts);
