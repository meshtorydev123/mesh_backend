import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PublicMeshMemberEntity } from "./publicmeshmember.entity";
import { UserEntity } from "./user.entity";

@Entity("publicmeshes")
export class PublicMeshEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    publicmesh_uid!: string;

    @Column({
        nullable: false
    })
    publicmesh_meshid!: string

    @Column({
        nullable: false
    })
    publicmesh_name!: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    publicmesh_createdat!: Date;

    @Column({
        type: "timestamp",
        nullable: true
    })
    publicmesh_updatedat!: Date;

    @ManyToOne(() => UserEntity, (publicmesh_updatedby) => publicmesh_updatedby.user_publicmeshesupdated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    publicmesh_updatedby!: UserEntity;

    @ManyToOne(() => UserEntity, (publicmesh_createdby) => publicmesh_createdby.user_publicmeshescreated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    publicmesh_createdby!: UserEntity;

    @OneToMany(
        () => PublicMeshMemberEntity,
        (publicmesh_members) => publicmesh_members.publicmeshmember_publicmesh,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    publicmesh_members!: PublicMeshMemberEntity[];

}