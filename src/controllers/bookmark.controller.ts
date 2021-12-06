import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BookmarkRepository } from "../database/repository/bookmark.repository";
import { Middleware } from "../middleware";
export class BookmarkController {





    static async addToBookmarks(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let bookmarkRepository = getCustomRepository(BookmarkRepository);
            await bookmarkRepository.addBookmark(req, res, Middleware.tokenData.user_uid);

        }
        else {

            return res.send({
                code: 401,
                message: "User not verified. Login Again",
                authentication: false,
            });

        }

    }





}