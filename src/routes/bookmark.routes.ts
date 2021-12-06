import Router from "express";
import { BookmarkController } from "../controllers/bookmark.controller";
const bookmarkRouter = Router();

bookmarkRouter.post("/addBookmark",BookmarkController.addToBookmarks);


 

export {bookmarkRouter};