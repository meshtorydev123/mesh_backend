import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PublicMeshEntity } from "./publicmesh.entity";
import { UserEntity } from "./user.entity";

@Entity("publicmeshmembers")
export class PublicMeshMemberEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    publicmeshmember_uid!: string;

    @ManyToOne(() => UserEntity, (publicmeshmember_user) => publicmeshmember_user.user_publicmeshesmember, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    publicmeshmember_user!: UserEntity;

    @ManyToOne(() => PublicMeshEntity, (publicmeshmember_publicmesh) => publicmeshmember_publicmesh.publicmesh_members, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    publicmeshmember_publicmesh!: PublicMeshEntity;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    publicmeshmember_joinedat!: Date;

    @Column({
        nullable: true
    })
    publicmeshmember_role!: string

}