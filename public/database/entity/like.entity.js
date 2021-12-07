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
exports.LikeEntity = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("./user.entity");
let LikeEntity = class LikeEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], LikeEntity.prototype, "like_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], LikeEntity.prototype, "like_time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.PostEntity, (like_post) => like_post.post_likes, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }),
    __metadata("design:type", post_entity_1.PostEntity)
], LikeEntity.prototype, "like_post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (like_user) => like_user.user_likes, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], LikeEntity.prototype, "like_user", void 0);
LikeEntity = __decorate([
    (0, typeorm_1.Entity)("likes")
], LikeEntity);
exports.LikeEntity = LikeEntity;
