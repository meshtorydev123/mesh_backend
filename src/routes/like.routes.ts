import Router from "express";
import { LikeController } from "../controllers/like.controller";
const likeRouter = Router();

likeRouter.post("/addLike",LikeController.addLike);


 

export {likeRouter};