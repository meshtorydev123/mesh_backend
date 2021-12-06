import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { LikeEntity } from "../entity/like.entity";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";

@EntityRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity>{

    async addLike(req: Request, res: Response, user_uid: string) {
        let {  post_uid } = req.body;
    
        var isAlreadyLiked =
          (await this.createQueryBuilder("likes")
            .leftJoin("likes.like_post", "posts")
            .leftJoin("likes.like_user", "users")
            .select()
            .where("users.user_uid = :user_uid", { user_uid })
            .andWhere("posts.post_uid = :post_uid", { post_uid })
            .getCount()) > 0;
    
        if (isAlreadyLiked) {
          return res.send({
            code: 403,
            added: false,
            message: "Already liked the post",
          });
        }
    
        if (!isAlreadyLiked) {
          let userRepository = getCustomRepository(UserRepository);
          let user = await userRepository.findOne({ user_uid });
    
          let postRepository = getCustomRepository(PostRepository);
          let post = await postRepository.findOne({ post_uid });
    
          let likesEntity = new LikeEntity();
    
          likesEntity.like_user= user!;
          likesEntity.like_post = post!;
    
          await likesEntity
            .save()
            .then((data: any) => {
              if (data !== undefined) {
                return res.send({
                  code: 201,
                  added: true,
                  message: "Liked the post",
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

    


}