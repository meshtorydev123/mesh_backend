import Router from "express";
import { PostController } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post("/addPost_userWall",PostController.addPostonUserWall)
postRouter.get("/fetchposts",PostController.fetchPosts)


 

export {postRouter};