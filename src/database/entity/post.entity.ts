import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookmarkEntity } from "./bookmark.entity";
import { CommentEntity } from "./comment.entity";
import { LikeEntity } from "./like.entity";
import { UserEntity } from "./user.entity";

@Entity("posts")
export class PostEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    post_uid!: string;

    @Column({
        nullable: false
    })
    post_title!: string;

    @Column({
        type: "simple-array",
        nullable: false
    })
    post_image!: string[];

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    post_time!: Date;

    @OneToMany(
        () => CommentEntity,
        (post_comments) => post_comments.comment_post,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
      )
      post_comments!: CommentEntity[];

    @OneToMany(() => LikeEntity, (post_likes) => post_likes.like_post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    post_likes!: LikeEntity[];


    @OneToMany(() => BookmarkEntity, (post_bookmarks) => post_bookmarks.bookmark_post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    post_bookmarks!: BookmarkEntity[];


    @ManyToOne(() => UserEntity, (post_user) => post_user.user_post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    post_user!: UserEntity;







}