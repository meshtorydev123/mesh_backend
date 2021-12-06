import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrivateMeshMemberEntity } from "./privatemeshmember.entity";
import { UserEntity } from "./user.entity";

@Entity("privatemeshes")
export class PrivateMeshEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    privatemesh_uid!: string;

    @Column({
        nullable: false
    })
    privatemesh_name!: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    privatemesh_createdat!: Date;

    @Column({
        type: "timestamp",
        nullable: true
    })
    privatemesh_updatedat!: Date;

    @ManyToOne(() => UserEntity, (privatemesh_updatedby) => privatemesh_updatedby.user_privatemeshesupdated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    privatemesh_updatedby!: UserEntity;

    @ManyToOne(() => UserEntity, (privatemesh_createdby) => privatemesh_createdby.user_privatemeshescreated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    privatemesh_createdby!: UserEntity;

    @OneToMany(
        () => PrivateMeshMemberEntity,
        (privatemesh_members) => privatemesh_members.privatemeshmember_privatemesh,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    privatemesh_members!: PrivateMeshMemberEntity[];




}