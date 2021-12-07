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
exports.PostRepository = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../entity/post.entity");
const user_repository_1 = require("./user.repository");
let PostRepository = class PostRepository extends typeorm_1.Repository {
    addPostonUserWall(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { post_title, post_image, post_comments, post_likes } = req.body;
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let user = yield userRepository.findOne({ user_uid });
            let postEntity = new post_entity_1.PostEntity();
            postEntity.post_user = user;
            postEntity.post_title = post_title;
            postEntity.post_image = post_image;
            postEntity.post_comments = post_comments;
            postEntity.post_likes = post_likes;
            yield postEntity
                .save()
                .then((data) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        added: true,
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
        });
    }
    fetchPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let post = yield this.createQueryBuilder("posts")
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
            }
            catch (error) {
                if (error !== undefined) {
                    return res.send({
                        code: 401,
                        data: null,
                        received: false,
                    });
                }
            }
        });
    }
};
PostRepository = __decorate([
    (0, typeorm_1.EntityRepository)(post_entity_1.PostEntity)
], PostRepository);
exports.PostRepository = PostRepository;
