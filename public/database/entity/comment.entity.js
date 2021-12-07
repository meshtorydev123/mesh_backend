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
exports.CommentEntity = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("./user.entity");
let CommentEntity = class CommentEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CommentEntity.prototype, "comment_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], CommentEntity.prototype, "comment_attachment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], CommentEntity.prototype, "comment_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], CommentEntity.prototype, "comment_parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.PostEntity, (comment_post) => comment_post.post_comments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", post_entity_1.PostEntity)
], CommentEntity.prototype, "comment_post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (comment_user) => comment_user.user_comments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], CommentEntity.prototype, "comment_user", void 0);
CommentEntity = __decorate([
    (0, typeorm_1.Entity)("comments")
], CommentEntity);
exports.CommentEntity = CommentEntity;
