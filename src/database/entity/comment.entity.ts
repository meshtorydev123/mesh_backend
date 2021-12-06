import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity("comments")
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    comment_uid!: string;


    @Column({
        nullable: false
    })
    comment_attachment!: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    comment_time!: Date;

    @Column({
        nullable: true
    })
    comment_parent!: string;

    @ManyToOne(() => PostEntity, (comment_post) => comment_post.post_comments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      comment_post!: PostEntity;
    
      @ManyToOne(() => UserEntity, (comment_user) => comment_user.user_comments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      comment_user!: UserEntity;




}