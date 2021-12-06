import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { DirectChatParticipantEntity } from "../entity/directchatparticipant.entity";
import { UserRepository } from "./user.repository";
import { DirectChatConversationRepository } from "./directchatconversation.repository";
import { DirectChatConversationEntity } from "../entity/directchatconversation.entity";

@EntityRepository(DirectChatParticipantEntity)
export class DirectChatParticipantRepository extends Repository<DirectChatParticipantEntity>{

    async addParticipantsToNewConversation(req: Request, res: Response, user_uid: string, conversation_uid: DirectChatConversationEntity) {
        let { directchat_to } = req.body;

        let userRepository = getCustomRepository(UserRepository);
        let user1 = await userRepository.findOne({ user_uid });
        let user2 = await userRepository.findOne({ user_uid: directchat_to });

        let directChatConversationRepository = getCustomRepository(DirectChatConversationRepository);
        let conversation = await directChatConversationRepository.findOne({ directchatconversation_uid: conversation_uid.directchatconversation_uid });



        let directChatParticipantEntity1 = new DirectChatParticipantEntity();
        directChatParticipantEntity1.directchatparticipant_user = user1!;
        directChatParticipantEntity1.directchatparticipant_conversation = conversation!;


        await (directChatParticipantEntity1)
            .save()
            .then((data: any) => {
                if (data !== undefined) {

                    console.log("1-true")
                }
            })
            .catch((error: any) => {
                if (error !== undefined) {
                    console.log(error);
                    console.log("1-false")

                }
            });





        let directChatParticipantEntity2 = new DirectChatParticipantEntity();
        directChatParticipantEntity2.directchatparticipant_user = user2!;
        directChatParticipantEntity2.directchatparticipant_conversation = conversation!;


        await directChatParticipantEntity2
            .save()
            .then((data: any) => {
                if (data !== undefined) {

                    console.log("2-true")
                }
            })
            .catch((error: any) => {
                if (error !== undefined) {
                    console.log(error);
                    console.log("2-false")

                }
            });












    }

    async checkIfConversationExist(req: Request, res: Response, user_uid: string) {

        let { directchat_to } = req.body;
        let directChatParticipantRepository = getCustomRepository(DirectChatParticipantRepository);


        
       

        const userQb = (await directChatParticipantRepository
            .createQueryBuilder("directchatparticipants")
            .select("directchatparticipants.directchatparticipant_conversation ")
            .groupBy("directchatparticipants.directchatparticipant_conversation")
            .having("COUNT(directchatparticipants.directchatparticipant_conversation) > 1")
            .where("directchatparticipants.directchatparticipant_user IN (:...users)", { users: [directchat_to, user_uid] }).getRawMany());

       



    
        if(userQb.length===1){
            return true;
        }
        else{
            return false;
        }



    }







}