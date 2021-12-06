import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../database/repository/post.repository";
import { Middleware } from "../middleware";
export class PostController {

    static async addPostonUserWall(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let postRepository = getCustomRepository(PostRepository);
            postRepository.addPostonUserWall(req, res, Middleware.tokenData.user_uid);

        }
        else {

            return res.send({
                code: 401,
                message: "User not verified. Login Again",
                authentication: false,
            });

        }

    }

    static async fetchPosts(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let postRepository = getCustomRepository(PostRepository);
            await postRepository.fetchPosts(req, res);

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