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
exports.PrivateMeshEntity = void 0;
const typeorm_1 = require("typeorm");
const privatemeshmember_entity_1 = require("./privatemeshmember.entity");
const user_entity_1 = require("./user.entity");
let PrivateMeshEntity = class PrivateMeshEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PrivateMeshEntity.prototype, "privatemesh_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], PrivateMeshEntity.prototype, "privatemesh_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], PrivateMeshEntity.prototype, "privatemesh_createdat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Date)
], PrivateMeshEntity.prototype, "privatemesh_updatedat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (privatemesh_updatedby) => privatemesh_updatedby.user_privatemeshesupdated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], PrivateMeshEntity.prototype, "privatemesh_updatedby", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (privatemesh_createdby) => privatemesh_createdby.user_privatemeshescreated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], PrivateMeshEntity.prototype, "privatemesh_createdby", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => privatemeshmember_entity_1.PrivateMeshMemberEntity, (privatemesh_members) => privatemesh_members.privatemeshmember_privatemesh, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], PrivateMeshEntity.prototype, "privatemesh_members", void 0);
PrivateMeshEntity = __decorate([
    (0, typeorm_1.Entity)("privatemeshes")
], PrivateMeshEntity);
exports.PrivateMeshEntity = PrivateMeshEntity;
