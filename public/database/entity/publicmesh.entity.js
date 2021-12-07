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
exports.PublicMeshEntity = void 0;
const typeorm_1 = require("typeorm");
const publicmeshmember_entity_1 = require("./publicmeshmember.entity");
const user_entity_1 = require("./user.entity");
let PublicMeshEntity = class PublicMeshEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PublicMeshEntity.prototype, "publicmesh_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], PublicMeshEntity.prototype, "publicmesh_meshid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], PublicMeshEntity.prototype, "publicmesh_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], PublicMeshEntity.prototype, "publicmesh_createdat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Date)
], PublicMeshEntity.prototype, "publicmesh_updatedat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (publicmesh_updatedby) => publicmesh_updatedby.user_publicmeshesupdated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], PublicMeshEntity.prototype, "publicmesh_updatedby", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (publicmesh_createdby) => publicmesh_createdby.user_publicmeshescreated, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], PublicMeshEntity.prototype, "publicmesh_createdby", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => publicmeshmember_entity_1.PublicMeshMemberEntity, (publicmesh_members) => publicmesh_members.publicmeshmember_publicmesh, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], PublicMeshEntity.prototype, "publicmesh_members", void 0);
PublicMeshEntity = __decorate([
    (0, typeorm_1.Entity)("publicmeshes")
], PublicMeshEntity);
exports.PublicMeshEntity = PublicMeshEntity;
