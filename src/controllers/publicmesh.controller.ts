import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PublicMeshRepository } from "../database/repository/publicmesh.repository";
import { Middleware } from "../middleware";
export class PublicMeshController {





    static async createPublicMesh(req: Request, res: Response) {

        let verifyToken = await Middleware.checkToken(req, res);
        if (verifyToken === true) {

            let publicMeshRepository = getCustomRepository(PublicMeshRepository);
            await publicMeshRepository.createPublicMesh(req, res, Middleware.tokenData.user_uid);

        }
        else {

            return res.send({
                code: 401,
                message: "User not verified. Login Again",
                authentication: false,
            });

        }

    }





}