import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { LikeRepository } from "../database/repository/like.repository";
import { Middleware } from "../middleware";
export class LikeController {





    static async addLike(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let likeRepository = getCustomRepository(LikeRepository);
            await likeRepository.addLike(req, res, Middleware.tokenData.user_uid);

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