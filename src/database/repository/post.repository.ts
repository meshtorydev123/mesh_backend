import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { PostEntity } from "../entity/post.entity";
import { Request, Response } from "express";
import { UserRepository } from "./user.repository";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity>{

    async addPostonUserWall(req: Request, res: Response, user_uid: string) {
        let { post_title, post_image, post_comments, post_likes } = req.body;

        let userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({ user_uid });

        let postEntity = new PostEntity();
        postEntity.post_user = user!;
        postEntity.post_title = post_title;
        postEntity.post_image = post_image;
        postEntity.post_comments = post_comments;
        postEntity.post_likes = post_likes;


        await postEntity
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

    async fetchPosts(req: Request, res: Response) {
        try {
          let post = await this.createQueryBuilder("posts")
            .leftJoinAndSelect("posts.post_user", "users")
            .select()
            .getMany();
    
          if (post !== undefined) {
            return res.send({
              code: 200,
              data: post,
              received: true,
            });
          }
        } catch (error) {
          if (error !== undefined) {
            return res.send({
              code: 401,
              data: null,
              received: false,
            });
          }
        }
      }


}