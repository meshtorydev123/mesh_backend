"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = void 0;
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("./bookmark.entity");
const comment_entity_1 = require("./comment.entity");
const like_entity_1 = require("./like.entity");
const user_entity_1 = require("./user.entity");
let PostEntity = class PostEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PostEntity.prototype, "post_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], PostEntity.prototype, "post_title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "simple-array",
        nullable: false
    }),
    __metadata("design:type", Array)
], PostEntity.prototype, "post_image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], PostEntity.prototype, "post_time", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (post_comments) => post_comments.comment_post, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], PostEntity.prototype, "post_comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.LikeEntity, (post_likes) => post_likes.like_post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], PostEntity.prototype, "post_likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.BookmarkEntity, (post_bookmarks) => post_bookmarks.bookmark_post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], PostEntity.prototype, "post_bookmarks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (post_user) => post_user.user_post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], PostEntity.prototype, "post_user", void 0);
PostEntity = __decorate([
    (0, typeorm_1.Entity)("posts")
], PostEntity);
exports.PostEntity = PostEntity;
