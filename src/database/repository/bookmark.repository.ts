import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";
import { BookmarkEntity } from "../entity/bookmark.entity";

@EntityRepository(BookmarkEntity)
export class BookmarkRepository extends Repository<BookmarkEntity>{

    async addBookmark(req: Request, res: Response, user_uid: string) {
        let {  post_uid } = req.body;
    
        var isAlreadyBookmarked =
          (await this.createQueryBuilder("bookmarks")
            .leftJoin("bookmarks.bookmark_post", "posts")
            .leftJoin("bookmarks.bookmark_user", "users")
            .select()
            .where("users.user_uid = :user_uid", { user_uid })
            .andWhere("posts.post_uid = :post_uid", { post_uid })
            .getCount()) > 0;
    
        if (isAlreadyBookmarked) {
          return res.send({
            code: 403,
            added: false,
            message: "Already bookmarked the post",
          });
        }
    
        if (!isAlreadyBookmarked) {
          let userRepository = getCustomRepository(UserRepository);
          let user = await userRepository.findOne({ user_uid });
    
          let postRepository = getCustomRepository(PostRepository);
          let post = await postRepository.findOne({ post_uid });
    
          let bookmarkEntity = new BookmarkEntity();
    
          bookmarkEntity.bookmark_user= user!;
          bookmarkEntity.bookmark_post = post!;
    
          await bookmarkEntity
            .save()
            .then((data: any) => {
              if (data !== undefined) {
                return res.send({
                  code: 201,
                  added: true,
                  message: "Bookmarked the post",
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