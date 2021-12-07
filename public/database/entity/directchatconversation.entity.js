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
exports.DirectChatConversationEntity = void 0;
const typeorm_1 = require("typeorm");
const directchatmessage_entity_1 = require("./directchatmessage.entity");
const directchatparticipant_entity_1 = require("./directchatparticipant.entity");
let DirectChatConversationEntity = class DirectChatConversationEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DirectChatConversationEntity.prototype, "directchatconversation_uid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => directchatparticipant_entity_1.DirectChatParticipantEntity, (directchatconversation_participant) => directchatconversation_participant.directchatparticipant_conversation, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], DirectChatConversationEntity.prototype, "directchatconversation_participant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => directchatmessage_entity_1.DirectChatMessageEntity, (directchatconversation_message) => directchatconversation_message.directchatmessage_conversation, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], DirectChatConversationEntity.prototype, "directchatconversation_message", void 0);
DirectChatConversationEntity = __decorate([
    (0, typeorm_1.Entity)("directchatconversations")
], DirectChatConversationEntity);
exports.DirectChatConversationEntity = DirectChatConversationEntity;
