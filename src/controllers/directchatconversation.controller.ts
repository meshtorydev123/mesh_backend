import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { DirectChatConversationRepository } from "../database/repository/directchatconversation.repository";
import { Middleware } from "../middleware";
export class DirectChatConversationController {

    static async startDirectChatConversation(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let directChatConversationRepository = getCustomRepository(DirectChatConversationRepository);
            let alreadyExist = await directChatConversationRepository.checkIfConversationExist(req, res, Middleware.tokenData.user_uid);

            console.log("alreadyExist");
            console.log(alreadyExist);

            if(alreadyExist === false){
                directChatConversationRepository.addNewConversation(req, res, Middleware.tokenData.user_uid);
            }
            else{
                return res.send({
                    code: 201,
                    added: true,
                    message: "Conversation already exist",
                  });
            }
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