import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity("likes")
export class LikeEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    like_uid!:string;

    @Column({
        type:"timestamp",
        default:()=>"CURRENT_TIMESTAMP(6)",  
        nullable:false 
    })
    like_time! : Date;

    @ManyToOne(()=>PostEntity,(like_post)=>like_post.post_likes,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"

    })
    like_post! : PostEntity;

    @ManyToOne(()=>UserEntity,(like_user)=>like_user.user_likes,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"

    })
    like_user! : UserEntity;

}