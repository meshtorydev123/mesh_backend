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
exports.DirectChatParticipantEntity = void 0;
const typeorm_1 = require("typeorm");
const directchatconversation_entity_1 = require("./directchatconversation.entity");
const user_entity_1 = require("./user.entity");
let DirectChatParticipantEntity = class DirectChatParticipantEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DirectChatParticipantEntity.prototype, "directchatparticipant_uid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (directchatparticipant_user) => directchatparticipant_user.user_directchat_participant, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], DirectChatParticipantEntity.prototype, "directchatparticipant_user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => directchatconversation_entity_1.DirectChatConversationEntity, (directchatparticipant_conversation) => directchatparticipant_conversation.directchatconversation_participant, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", directchatconversation_entity_1.DirectChatConversationEntity)
], DirectChatParticipantEntity.prototype, "directchatparticipant_conversation", void 0);
DirectChatParticipantEntity = __decorate([
    (0, typeorm_1.Entity)("directchatparticipants")
], DirectChatParticipantEntity);
exports.DirectChatParticipantEntity = DirectChatParticipantEntity;
