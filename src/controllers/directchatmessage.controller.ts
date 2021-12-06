import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { DirectChatMessageRepository } from "../database/repository/directchatmessage.repository";
import { Middleware } from "../middleware";
export class DirectChatMessageController{

    static async sendDirectMessage(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let directChatMessageRepository = getCustomRepository(DirectChatMessageRepository);
            directChatMessageRepository.sendmessage(req, res, Middleware.tokenData.user_uid);

            
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
