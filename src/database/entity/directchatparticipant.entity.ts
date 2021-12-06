import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DirectChatConversationEntity } from "./directchatconversation.entity";
import { UserEntity } from "./user.entity";

@Entity("directchatparticipants")
export class DirectChatParticipantEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    directchatparticipant_uid!: string;

    @ManyToOne(() => UserEntity, (directchatparticipant_user) => directchatparticipant_user.user_directchat_participant, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    directchatparticipant_user!: UserEntity;

    @ManyToOne(() => DirectChatConversationEntity, (directchatparticipant_conversation) => directchatparticipant_conversation.directchatconversation_participant, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    directchatparticipant_conversation!: DirectChatConversationEntity;



}