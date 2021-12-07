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
exports.UserConnectionEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserConnectionEntity = class UserConnectionEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UserConnectionEntity.prototype, "userconnection_uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false,
    }),
    __metadata("design:type", Date)
], UserConnectionEntity.prototype, "userconnection_time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (userconnection_to_user) => userconnection_to_user.user_from_connection, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserConnectionEntity.prototype, "userconnection_from_user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (userconnection_to_user) => userconnection_to_user.user_to_connection, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserConnectionEntity.prototype, "userconnection_to_user", void 0);
UserConnectionEntity = __decorate([
    (0, typeorm_1.Entity)("userconnections")
], UserConnectionEntity);
exports.UserConnectionEntity = UserConnectionEntity;
