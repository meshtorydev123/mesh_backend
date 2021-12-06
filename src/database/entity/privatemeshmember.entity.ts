import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrivateMeshEntity } from "./privatemesh.entity";
import { UserEntity } from "./user.entity";

@Entity("privatemeshmembers")
export class PrivateMeshMemberEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    publicmeshmember_uid!: string;

    @ManyToOne(() => UserEntity, (privatemeshmember_user) => privatemeshmember_user.user_privatemeshesmember, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    privatemeshmember_user!: UserEntity;

    @ManyToOne(() => PrivateMeshEntity, (privatemeshmember_privatemesh) => privatemeshmember_privatemesh.privatemesh_members, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    privatemeshmember_privatemesh!: PrivateMeshEntity;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    privatemeshmember_joinedat!: Date;

    @Column({
        nullable: true
    })
    privatemeshmember_role!: string

}