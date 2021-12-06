import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DirectChatConversationEntity } from "./directchatconversation.entity";
import { UserEntity } from "./user.entity";

@Entity("directchatmessages")
export class DirectChatMessageEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    directchatmessage_uid!: string;

    @ManyToOne(() => DirectChatConversationEntity, (directchatmessage_conversation) => directchatmessage_conversation.directchatconversation_message, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    directchatmessage_conversation!: DirectChatConversationEntity;

    @ManyToOne(() => UserEntity, (directchatmessage_sender) => directchatmessage_sender.user_messagesent, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    directchatmessage_sender!: UserEntity;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    directchatmessage_time!: Date;

    @Column({
        nullable: false
    })
    directchatmessage_content!: string;

}