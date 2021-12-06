import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { DirectChatConversationEntity } from "../entity/directchatconversation.entity";
import { DirectChatParticipantRepository } from "./directchatparticipant.repository";

@EntityRepository(DirectChatConversationEntity)
export class DirectChatConversationRepository extends Repository<DirectChatConversationEntity>{


    async addNewConversation(req: Request, res: Response, user_uid: string) {
        let directChatConversationEntity = new DirectChatConversationEntity();
        let directChatParticipantRepository = new DirectChatParticipantRepository();
        await directChatConversationEntity
            .save()
            .then((data: any) => {
                if (data !== undefined) {
                    directChatParticipantRepository.addParticipantsToNewConversation(req,res,user_uid,data);
                    console.log("true");
                }
            })
            .catch((error: any) => {
                if (error !== undefined) {
                    console.log(error);
                    console.log("false");

                }
            });

    }

    async checkIfConversationExist(req: Request, res: Response, user_uid: string){

        let directChatParticipantRepository = new DirectChatParticipantRepository();

        return directChatParticipantRepository.checkIfConversationExist(req,res,user_uid);


       


    }

   
    


}