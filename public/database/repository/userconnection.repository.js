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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnectionRepository = void 0;
const typeorm_1 = require("typeorm");
const user_repository_1 = require("./user.repository");
const userconnection_entity_1 = require("../entity/userconnection.entity");
let UserConnectionRepository = class UserConnectionRepository extends typeorm_1.Repository {
    addUserConnection(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userconnection_to_user } = req.body;
            let isAlreadyConnectionByOneSide = (yield this.createQueryBuilder("userconnections")
                .select()
                .where("userconnections.userconnection_to_user = :userconnection_to_user", {
                userconnection_to_user,
            })
                .andWhere("userconnections.userconnection_from_user = :user_uid", {
                user_uid,
            })
                .getCount()) > 0;
            if (isAlreadyConnectionByOneSide) {
                return res.send({
                    code: 301,
                    message: "Already connected!",
                });
            }
            if (!isAlreadyConnectionByOneSide) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                let user_from_connection = yield userRepository.findOne({ user_uid });
                let user_to_connection = yield userRepository.findOne({
                    user_uid: userconnection_to_user,
                });
                1;
                let userconnectionEntity = new userconnection_entity_1.UserConnectionEntity();
                userconnectionEntity.userconnection_from_user = user_from_connection;
                userconnectionEntity.userconnection_to_user = user_to_connection;
                yield userconnectionEntity
                    .save()
                    .then((data) => {
                    if (data !== undefined) {
                        return res.send({
                            code: 201,
                            message: "Connection established",
                        });
                    }
                })
                    .catch((error) => {
                    if (error !== undefined) {
                        console.log(error);
                        return res.send({
                            code: 406,
                            message: "Something went wrong, Try again",
                        });
                    }
                });
            }
        });
    }
};
UserConnectionRepository = __decorate([
    (0, typeorm_1.EntityRepository)(userconnection_entity_1.UserConnectionEntity)
], UserConnectionRepository);
exports.UserConnectionRepository = UserConnectionRepository;
