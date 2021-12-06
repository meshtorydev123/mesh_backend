import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DirectChatMessageEntity } from "./directchatmessage.entity";
import { DirectChatParticipantEntity } from "./directchatparticipant.entity";

@Entity("directchatconversations")
export class DirectChatConversationEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    directchatconversation_uid!: string;

    @OneToMany(
        () => DirectChatParticipantEntity,
        (directchatconversation_participant) => directchatconversation_participant.directchatparticipant_conversation,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    directchatconversation_participant!: DirectChatParticipantEntity[];

    @OneToMany(
        () => DirectChatMessageEntity,
        (directchatconversation_message) => directchatconversation_message.directchatmessage_conversation,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    directchatconversation_message!: DirectChatMessageEntity[];
}