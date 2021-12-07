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
exports.PublicMeshMemberEntity = void 0;
const typeorm_1 = require("typeorm");
const publicmesh_entity_1 = require("./publicmesh.entity");
const user_entity_1 = require("./user.entity");
let PublicMeshMemberEntity = class PublicMeshMemberEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PublicMeshMemberEntity.prototype, "publicmeshmember_uid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (publicmeshmember_user) => publicmeshmember_user.user_publicmeshesmember, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], PublicMeshMemberEntity.prototype, "publicmeshmember_user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => publicmesh_entity_1.PublicMeshEntity, (publicmeshmember_publicmesh) => publicmeshmember_publicmesh.publicmesh_members, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", publicmesh_entity_1.PublicMeshEntity)
], PublicMeshMemberEntity.prototype, "publicmeshmember_publicmesh", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], PublicMeshMemberEntity.prototype, "publicmeshmember_joinedat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], PublicMeshMemberEntity.prototype, "publicmeshmember_role", void 0);
PublicMeshMemberEntity = __decorate([
    (0, typeorm_1.Entity)("publicmeshmembers")
], PublicMeshMemberEntity);
exports.PublicMeshMemberEntity = PublicMeshMemberEntity;
