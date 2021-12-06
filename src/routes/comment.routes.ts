import Router from "express";
import { CommentController } from "../controllers/comment.controller";
const commentRouter = Router();

commentRouter.post("/addRootComment",CommentController.addRootComment);
commentRouter.post("/addReplyComment",CommentController.addReplyComment);



 

export {commentRouter};