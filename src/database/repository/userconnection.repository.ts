import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { UserConnectionEntity } from "../entity/userconnection.entity";

@EntityRepository(UserConnectionEntity)
export class UserConnectionRepository extends Repository<UserConnectionEntity>{


    async addUserConnection(req: Request, res: Response,user_uid: string) {
        let { userconnection_to_user } = req.body;
    
        let isAlreadyConnectionByOneSide =
          (await this.createQueryBuilder("userconnections")
            .select()
            .where("userconnections.userconnection_to_user = :userconnection_to_user", {
                userconnection_to_user,
            })
            .andWhere("userconnections.userconnection_from_user = :user_uid", {
                user_uid,
            })
            .getCount()) > 0;
    
        if (isAlreadyConnectionByOneSide) {
          return res.send({
            code: 301,
            message: "Already connected!",
          });
        }
    
        if (!isAlreadyConnectionByOneSide) {
          let userRepository = getCustomRepository(UserRepository);
          let user_from_connection = await userRepository.findOne({ user_uid });
          let user_to_connection = await userRepository.findOne({
            user_uid: userconnection_to_user,
          });
          1;
    
          let userconnectionEntity = new UserConnectionEntity();
    
          userconnectionEntity.userconnection_from_user = user_from_connection!;
          userconnectionEntity.userconnection_to_user = user_to_connection!;
          
    
          await userconnectionEntity
            .save()
            .then((data: any) => {
              if (data !== undefined) {
                return res.send({
                  code: 201,
                  message: "Connection established",
                });
              }
            })
            .catch((error: any) => {
              if (error !== undefined) {
                console.log(error);
                return res.send({
                  code: 406,
                  message: "Something went wrong, Try again",
                });
              }
            });
        }
      }

    



    


}