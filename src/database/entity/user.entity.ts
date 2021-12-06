import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { entityPrefix } from "../../ormconfig";
import { BookmarkEntity } from "./bookmark.entity";
import { CommentEntity } from "./comment.entity";
import { DirectChatMessageEntity } from "./directchatmessage.entity";
import { DirectChatParticipantEntity } from "./directchatparticipant.entity";
import { LikeEntity } from "./like.entity";
import { PostEntity } from "./post.entity";
import { PrivateMeshEntity } from "./privatemesh.entity";
import { PrivateMeshMemberEntity } from "./privatemeshmember.entity";
import { PublicMeshEntity } from "./publicmesh.entity";
import { PublicMeshMemberEntity } from "./publicmeshmember.entity";
import { UserConnectionEntity } from "./userconnection.entity";


@Entity("users")
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    user_uid!: string;


    @Column({
        nullable: false
    })
    user_username!: string

    @Column({
        nullable: true
    })
    user_email!: string

    @Column({
        nullable: false
    })
    user_password!: string

    @Column({
        nullable: true
    })
    user_profilephoto!: string

    @Column({
        nullable: true
    })
    user_phone!: string

    @Column({
        nullable: true
    })
    user_website!: string

    @Column({
        nullable: true
    })
    user_gender!: string

    @Column({
        nullable: true
    })
    user_dob!: string

    @Column({
        nullable: true
    })
    user_fullname!: string

    @Column({
        nullable: true
    })
    user_bio!: string

    @OneToMany(() => PostEntity, (user_post) => user_post.post_user)
    user_post!: PostEntity[];

    @OneToMany(() => LikeEntity, (user_likes) => user_likes.like_user)
    user_likes!: LikeEntity[];

    @OneToMany(() => BookmarkEntity, (user_bookmarks) => user_bookmarks.bookmark_user)
    user_bookmarks!: BookmarkEntity[];

    @OneToMany(() => CommentEntity, (user_comments) => user_comments.comment_user)
    user_comments!: CommentEntity[];

    @OneToMany(
        () => UserConnectionEntity,
        (user_from_connection) =>
            user_from_connection.userconnection_from_user,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_from_connection!: UserConnectionEntity[];

    @OneToMany(
        () => UserConnectionEntity,
        (user_to_connection) => user_to_connection.userconnection_to_user,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_to_connection!: UserConnectionEntity[];

    @OneToMany(
        () => DirectChatParticipantEntity,
        (user_directchat_participant) => user_directchat_participant.directchatparticipant_user,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_directchat_participant!: DirectChatParticipantEntity[];

    @OneToMany(
        () => DirectChatMessageEntity,
        (user_messagesent) => user_messagesent.directchatmessage_sender,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_messagesent!: DirectChatMessageEntity[];

    @OneToMany(
        () => PublicMeshEntity,
        (user_publicmeshescreated) => user_publicmeshescreated.publicmesh_createdby,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_publicmeshescreated!: PublicMeshEntity[];

    @OneToMany(
        () => PublicMeshEntity,
        (user_publicmeshesupdated) => user_publicmeshesupdated.publicmesh_updatedby,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_publicmeshesupdated!: PublicMeshEntity[];

    @OneToMany(
        () => PublicMeshMemberEntity,
        (user_publicmeshesmember) => user_publicmeshesmember.publicmeshmember_user,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_publicmeshesmember!: PublicMeshMemberEntity[];

    @OneToMany(
        () => PrivateMeshEntity,
        (user_privatemeshescreated) => user_privatemeshescreated.privatemesh_createdby,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_privatemeshescreated!: PrivateMeshEntity[];

    @OneToMany(
        () => PrivateMeshEntity,
        (user_privatemeshesupdated) => user_privatemeshesupdated.privatemesh_updatedby,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_privatemeshesupdated!: PrivateMeshEntity[];

    @OneToMany(
        () => PrivateMeshMemberEntity,
        (user_privatemeshesmember) => user_privatemeshesmember.privatemeshmember_user,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user_privatemeshesmember!: PrivateMeshMemberEntity[];



    

    







}