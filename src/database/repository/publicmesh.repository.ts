import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { PublicMeshEntity } from "../entity/publicmesh.entity";
import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { PublicMeshMemberRepository } from "./publicmeshmember.repository";


@EntityRepository(PublicMeshEntity)
export class PublicMeshRepository extends Repository<PublicMeshEntity>{

    async createPublicMesh(req: Request, res: Response, user_uid: string) {
        let {publicmesh_meshid,publicmesh_name,} = req.body;

        let userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({ user_uid });

        let publicMeshMemberRepository = new PublicMeshMemberRepository();


        let publicMeshEntity = new PublicMeshEntity();
        publicMeshEntity.publicmesh_meshid = publicmesh_meshid!;
        publicMeshEntity.publicmesh_name = publicmesh_name;
        publicMeshEntity.publicmesh_createdby = user!;
        


        await publicMeshEntity
            .save()
            .then((data: any) => {
                if (data !== undefined) {
                    publicMeshMemberRepository.addAdminToPublicMesh(req,res,user_uid,data);

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