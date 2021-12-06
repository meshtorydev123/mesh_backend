import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CommentRepository } from "../database/repository/comment.repository";
import { Middleware } from "../middleware";
export class CommentController {

    static async addRootComment(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let commentRepository = getCustomRepository(CommentRepository);
            await commentRepository.addRootComment(req, res, Middleware.tokenData.user_uid);

        }
        else {

            return res.send({
                code: 401,
                message: "User not verified. Login Again",
                authentication: false,
            });

        }

    }

    static async addReplyComment(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let commentRepository = getCustomRepository(CommentRepository);
            await commentRepository.addReplyComment(req, res, Middleware.tokenData.user_uid);

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