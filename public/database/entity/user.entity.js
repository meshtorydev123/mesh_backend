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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("./bookmark.entity");
const comment_entity_1 = require("./comment.entity");
const directchatmessage_entity_1 = require("./directchatmessage.entity");
const directchatparticipant_entity_1 = require("./directchatparticipant.entity");
const like_entity_1 = require("./like.entity");
const post_entity_1 = require("./post.entity");
const privatemesh_entity_1 = require("./privatemesh.entity");
const privatemeshmember_entity_1 = require("./privatemeshmember.entity");
const publicmesh_entity_1 = require("./publicmesh.entity");
const publicmeshmember_entity_1 = require("./publicmeshmember.entity");
const userconnection_entity_1 = require("./userconnection.entity");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UserEntity.prototype, "user_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_profilephoto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_website", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_dob", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_bio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.PostEntity, (user_post) => user_post.post_user),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.LikeEntity, (user_likes) => user_likes.like_user),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.BookmarkEntity, (user_bookmarks) => user_bookmarks.bookmark_user),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_bookmarks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (user_comments) => user_comments.comment_user),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userconnection_entity_1.UserConnectionEntity, (user_from_connection) => user_from_connection.userconnection_from_user, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_from_connection", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userconnection_entity_1.UserConnectionEntity, (user_to_connection) => user_to_connection.userconnection_to_user, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_to_connection", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => directchatparticipant_entity_1.DirectChatParticipantEntity, (user_directchat_participant) => user_directchat_participant.directchatparticipant_user, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_directchat_participant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => directchatmessage_entity_1.DirectChatMessageEntity, (user_messagesent) => user_messagesent.directchatmessage_sender, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_messagesent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => publicmesh_entity_1.PublicMeshEntity, (user_publicmeshescreated) => user_publicmeshescreated.publicmesh_createdby, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_publicmeshescreated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => publicmesh_entity_1.PublicMeshEntity, (user_publicmeshesupdated) => user_publicmeshesupdated.publicmesh_updatedby, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_publicmeshesupdated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => publicmeshmember_entity_1.PublicMeshMemberEntity, (user_publicmeshesmember) => user_publicmeshesmember.publicmeshmember_user, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_publicmeshesmember", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => privatemesh_entity_1.PrivateMeshEntity, (user_privatemeshescreated) => user_privatemeshescreated.privatemesh_createdby, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_privatemeshescreated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => privatemesh_entity_1.PrivateMeshEntity, (user_privatemeshesupdated) => user_privatemeshesupdated.privatemesh_updatedby, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_privatemeshesupdated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => privatemeshmember_entity_1.PrivateMeshMemberEntity, (user_privatemeshesmember) => user_privatemeshesmember.privatemeshmember_user, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_privatemeshesmember", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)("users")
], UserEntity);
exports.UserEntity = UserEntity;
