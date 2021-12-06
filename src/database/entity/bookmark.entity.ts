import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity("bookmarks")
export class BookmarkEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    bookmark_uid!: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false,
    })
    bookmark_time!: Date;

    @ManyToOne(()=>PostEntity,(bookmark_post)=>bookmark_post.post_bookmarks,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    bookmark_post!:PostEntity;

    @ManyToOne(()=>UserEntity,(bookmark_user)=>bookmark_user.user_bookmarks,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    bookmark_user!:UserEntity;
}
