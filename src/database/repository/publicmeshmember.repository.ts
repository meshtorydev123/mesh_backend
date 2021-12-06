import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { PublicMeshEntity } from "../entity/publicmesh.entity";
import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { PublicMeshMemberEntity } from "../entity/publicmeshmember.entity";
import { PublicMeshRepository } from "./publicmesh.repository";


@EntityRepository(PublicMeshMemberEntity)
export class PublicMeshMemberRepository extends Repository<PublicMeshMemberEntity>{

    async addAdminToPublicMesh(req: Request, res: Response, user_uid: string,data:PublicMeshEntity) {

        let userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({ user_uid });

        let publicMeshRepository = getCustomRepository(PublicMeshRepository);
        let publicMesh = await publicMeshRepository.findOne({ publicmesh_uid:data.publicmesh_uid });

        let publicMeshMemberEntity = new PublicMeshMemberEntity();
        publicMeshMemberEntity.publicmeshmember_publicmesh = publicMesh!;
        publicMeshMemberEntity.publicmeshmember_user = user!;
        publicMeshMemberEntity.publicmeshmember_role = "admin";
        
        


        await publicMeshMemberEntity
            .save()
            .then((data: any) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        added: true,
                    });
                }
            })
            .catch((error: any) => {
                if (error !== undefined) {
                    console.log(error);
                    return res.send({
                        code: 401,
                        added: false,
                    });
                }
            });


    }

}