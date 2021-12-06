import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("userconnections")
export class UserConnectionEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    userconnection_uid!:string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false,
      })
      userconnection_time!: Date;

      @ManyToOne(
        () => UserEntity,
        (userconnection_to_user) =>
        userconnection_to_user.user_from_connection,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
      )
      userconnection_from_user!: UserEntity;

      @ManyToOne(
        () => UserEntity,
        (userconnection_to_user) =>
        userconnection_to_user.user_to_connection,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
      )
      userconnection_to_user!: UserEntity;




}