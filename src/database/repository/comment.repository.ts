import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";
import { CommentEntity } from "../entity/comment.entity";

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity>{

    async addRootComment(req: Request, res: Response, user_uid: string) {

        let { post_uid, comment_attachment } = req.body;

        let userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({ user_uid });

        let postRepository = getCustomRepository(PostRepository);
        let post = await postRepository.findOne({ post_uid });

        let commentEntity = new CommentEntity();

        commentEntity.comment_user = user!;
        commentEntity.comment_post = post!;
        commentEntity.comment_attachment = comment_attachment!;

        await commentEntity
            .save()
            .then((data: any) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        added: true,
                        message: "Added comment to the post",
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


    async addReplyComment(req: Request, res: Response, user_uid: string) {

        let { post_uid, comment_attachment ,comment_parent} = req.body;

        let userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({ user_uid });

        let postRepository = getCustomRepository(PostRepository);
        let post = await postRepository.findOne({ post_uid });

        let commentEntity = new CommentEntity();

        commentEntity.comment_user = user!;
        commentEntity.comment_post = post!;
        commentEntity.comment_attachment = comment_attachment!;
        commentEntity.comment_parent = comment_parent!;


        await commentEntity
            .save()
            .then((data: any) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        added: true,
                        message: "Added reply to the comment",
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