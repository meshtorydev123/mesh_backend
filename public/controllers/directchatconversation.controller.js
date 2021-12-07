"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectChatConversationController = void 0;
const typeorm_1 = require("typeorm");
const directchatconversation_repository_1 = require("../database/repository/directchatconversation.repository");
const middleware_1 = require("../middleware");
class DirectChatConversationController {
    static startDirectChatConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let directChatConversationRepository = (0, typeorm_1.getCustomRepository)(directchatconversation_repository_1.DirectChatConversationRepository);
                let alreadyExist = yield directChatConversationRepository.checkIfConversationExist(req, res, middleware_1.Middleware.tokenData.user_uid);
                console.log("alreadyExist");
                console.log(alreadyExist);
                if (alreadyExist === false) {
                    directChatConversationRepository.addNewConversation(req, res, middleware_1.Middleware.tokenData.user_uid);
                }
                else {
                    return res.send({
                        code: 201,
                        added: true,
                        message: "Conversation already exist",
                    });
                }
            }
            else {
                return res.send({
                    code: 401,
                    message: "User not verified. Login Again",
                    authentication: false,
                });
            }
        });
    }
}
exports.DirectChatConversationController = DirectChatConversationController;
