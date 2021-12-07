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
exports.DirectChatMessageEntity = void 0;
const typeorm_1 = require("typeorm");
const directchatconversation_entity_1 = require("./directchatconversation.entity");
const user_entity_1 = require("./user.entity");
let DirectChatMessageEntity = class DirectChatMessageEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DirectChatMessageEntity.prototype, "directchatmessage_uid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => directchatconversation_entity_1.DirectChatConversationEntity, (directchatmessage_conversation) => directchatmessage_conversation.directchatconversation_message, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", directchatconversation_entity_1.DirectChatConversationEntity)
], DirectChatMessageEntity.prototype, "directchatmessage_conversation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (directchatmessage_sender) => directchatmessage_sender.user_messagesent, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], DirectChatMessageEntity.prototype, "directchatmessage_sender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], DirectChatMessageEntity.prototype, "directchatmessage_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], DirectChatMessageEntity.prototype, "directchatmessage_content", void 0);
DirectChatMessageEntity = __decorate([
    (0, typeorm_1.Entity)("directchatmessages")
], DirectChatMessageEntity);
exports.DirectChatMessageEntity = DirectChatMessageEntity;
