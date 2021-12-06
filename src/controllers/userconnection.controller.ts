import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserConnectionRepository } from "../database/repository/userconnection.repository";
import { Middleware } from "../middleware";
export class UserConnectionController {





    static async addUserConnection(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let userconnectionRepository = getCustomRepository(UserConnectionRepository);
            await userconnectionRepository.addUserConnection(req, res, Middleware.tokenData.user_uid);

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