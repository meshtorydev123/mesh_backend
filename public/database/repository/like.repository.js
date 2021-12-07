"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRepository = void 0;
const typeorm_1 = require("typeorm");
const like_entity_1 = require("../entity/like.entity");
const user_repository_1 = require("./user.repository");
const post_repository_1 = require("./post.repository");
let LikeRepository = class LikeRepository extends typeorm_1.Repository {
    addLike(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { post_uid } = req.body;
            var isAlreadyLiked = (yield this.createQueryBuilder("likes")
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
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                let user = yield userRepository.findOne({ user_uid });
                let postRepository = (0, typeorm_1.getCustomRepository)(post_repository_1.PostRepository);
                let post = yield postRepository.findOne({ post_uid });
                let likesEntity = new like_entity_1.LikeEntity();
                likesEntity.like_user = user;
                likesEntity.like_post = post;
                yield likesEntity
                    .save()
                    .then((data) => {
                    if (data !== undefined) {
                        return res.send({
                            code: 201,
                            added: true,
                            message: "Liked the post",
                        });
                    }
                })
                    .catch((error) => {
                    if (error !== undefined) {
                        console.log(error);
                        return res.send({
                            code: 401,
                            added: false,
                        });
                    }
                });
            }
        });
    }
};
LikeRepository = __decorate([
    (0, typeorm_1.EntityRepository)(like_entity_1.LikeEntity)
], LikeRepository);
exports.LikeRepository = LikeRepository;
