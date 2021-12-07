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
exports.CommentRepository = void 0;
const typeorm_1 = require("typeorm");
const user_repository_1 = require("./user.repository");
const post_repository_1 = require("./post.repository");
const comment_entity_1 = require("../entity/comment.entity");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    addRootComment(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { post_uid, comment_attachment } = req.body;
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let user = yield userRepository.findOne({ user_uid });
            let postRepository = (0, typeorm_1.getCustomRepository)(post_repository_1.PostRepository);
            let post = yield postRepository.findOne({ post_uid });
            let commentEntity = new comment_entity_1.CommentEntity();
            commentEntity.comment_user = user;
            commentEntity.comment_post = post;
            commentEntity.comment_attachment = comment_attachment;
            yield commentEntity
                .save()
                .then((data) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        added: true,
                        message: "Added comment to the post",
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
    addReplyComment(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { post_uid, comment_attachment, comment_parent } = req.body;
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let user = yield userRepository.findOne({ user_uid });
            let postRepository = (0, typeorm_1.getCustomRepository)(post_repository_1.PostRepository);
            let post = yield postRepository.findOne({ post_uid });
            let commentEntity = new comment_entity_1.CommentEntity();
            commentEntity.comment_user = user;
            commentEntity.comment_post = post;
            commentEntity.comment_attachment = comment_attachment;
            commentEntity.comment_parent = comment_parent;
            yield commentEntity
                .save()
                .then((data) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        added: true,
                        message: "Added reply to the comment",
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
};
CommentRepository = __decorate([
    (0, typeorm_1.EntityRepository)(comment_entity_1.CommentEntity)
], CommentRepository);
exports.CommentRepository = CommentRepository;
