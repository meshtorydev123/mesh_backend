import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { DirectChatMessageEntity } from "../entity/directchatmessage.entity";
import { UserRepository } from "./user.repository";
import { DirectChatConversationRepository } from "./directchatconversation.repository";

@EntityRepository(DirectChatMessageEntity)
export class DirectChatMessageRepository extends Repository<DirectChatMessageEntity>{

    async sendmessage(req: Request, res: Response, user_uid: string) {
        let { directchatmessage_conversation, directchatmessage_content } = req.body;

        let userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({ user_uid });

        let directChatConversationRepository = getCustomRepository(DirectChatConversationRepository);
        let conversation = await directChatConversationRepository.findOne({ directchatconversation_uid: directchatmessage_conversation });

        let directChatMessageEntity = new DirectChatMessageEntity();
        directChatMessageEntity.directchatmessage_conversation = conversation!;
        directChatMessageEntity.directchatmessage_sender = user!;
        directChatMessageEntity.directchatmessage_content = directchatmessage_content;



        await directChatMessageEntity
            .save()
            .then((data: any) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        added: true,
                    });
                }
            })
            .catch((error: any) => {
                if (error !== undefined) {
                    console.log(error);
                    return res.send({
                        code: 401,
                        added: false,
                    });
                }
            });





    }


    
   
    


}