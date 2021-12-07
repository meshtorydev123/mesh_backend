"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var DirectChatParticipantRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectChatParticipantRepository = void 0;
const typeorm_1 = require("typeorm");
const directchatparticipant_entity_1 = require("../entity/directchatparticipant.entity");
const user_repository_1 = require("./user.repository");
const directchatconversation_repository_1 = require("./directchatconversation.repository");
let DirectChatParticipantRepository = DirectChatParticipantRepository_1 = class DirectChatParticipantRepository extends typeorm_1.Repository {
    addParticipantsToNewConversation(req, res, user_uid, conversation_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { directchat_to } = req.body;
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let user1 = yield userRepository.findOne({ user_uid });
            let user2 = yield userRepository.findOne({ user_uid: directchat_to });
            let directChatConversationRepository = (0, typeorm_1.getCustomRepository)(directchatconversation_repository_1.DirectChatConversationRepository);
            let conversation = yield directChatConversationRepository.findOne({ directchatconversation_uid: conversation_uid.directchatconversation_uid });
            let directChatParticipantEntity1 = new directchatparticipant_entity_1.DirectChatParticipantEntity();
            directChatParticipantEntity1.directchatparticipant_user = user1;
            directChatParticipantEntity1.directchatparticipant_conversation = conversation;
            yield (directChatParticipantEntity1)
                .save()
                .then((data) => {
                if (data !== undefined) {
                    console.log("1-true");
                }
            })
                .catch((error) => {
                if (error !== undefined) {
                    console.log(error);
                    console.log("1-false");
                }
            });
            let directChatParticipantEntity2 = new directchatparticipant_entity_1.DirectChatParticipantEntity();
            directChatParticipantEntity2.directchatparticipant_user = user2;
            directChatParticipantEntity2.directchatparticipant_conversation = conversation;
            yield directChatParticipantEntity2
                .save()
                .then((data) => {
                if (data !== undefined) {
                    console.log("2-true");
                }
            })
                .catch((error) => {
                if (error !== undefined) {
                    console.log(error);
                    console.log("2-false");
                }
            });
        });
    }
    checkIfConversationExist(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { directchat_to } = req.body;
            let directChatParticipantRepository = (0, typeorm_1.getCustomRepository)(DirectChatParticipantRepository_1);
            const userQb = (yield directChatParticipantRepository
                .createQueryBuilder("directchatparticipants")
                .select("directchatparticipants.directchatparticipant_conversation ")
                .groupBy("directchatparticipants.directchatparticipant_conversation")
                .having("COUNT(directchatparticipants.directchatparticipant_conversation) > 1")
                .where("directchatparticipants.directchatparticipant_user IN (:...users)", { users: [directchat_to, user_uid] }).getRawMany());
            if (userQb.length === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    }
};
DirectChatParticipantRepository = DirectChatParticipantRepository_1 = __decorate([
    (0, typeorm_1.EntityRepository)(directchatparticipant_entity_1.DirectChatParticipantEntity)
], DirectChatParticipantRepository);
exports.DirectChatParticipantRepository = DirectChatParticipantRepository;
