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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../database/repository/user.repository");
dotenv_1.default.config();
class AuthenticationController {
    static createNewAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_password } = req.body;
            let salt = yield bcrypt_1.default.genSalt(10);
            bcrypt_1.default.hash(user_password, salt, (error, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return res.send({
                        message: error,
                        authentication: false,
                    });
                }
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                yield userRepository.saveUserData(req, res, hashedPassword);
                return res.send({
                    code: 201,
                    message: "Account created",
                    authentication: true,
                });
            }));
        });
    }
    static loginwithusername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_username, user_password } = req.body;
            let jwt_secret_key = process.env.JWT_SECRET_KEY;
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let userdata = yield userRepository.findUserPassword(req, res, user_username);
            let uid = yield userRepository.in_GetUserUid(req, res);
            if (userdata === undefined) {
                return res.send({
                    code: 404,
                    message: "Incorrect username",
                    authentication: false,
                });
            }
            bcrypt_1.default.compare(user_password, userdata.user_password, (error, result) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return res.send({
                        code: 404,
                        message: error,
                        authentication: false
                    });
                }
                if (!result) {
                    return res.send({
                        code: 404,
                        message: "Incorrect Password",
                        authentication: false
                    });
                }
                jsonwebtoken_1.default.sign({
                    user_uid: uid.user_uid, //! Payload
                }, jwt_secret_key, //! Secret key
                (error, data) => __awaiter(this, void 0, void 0, function* () {
                    //! Callback
                    if (error) {
                        return res.send({
                            code: 401,
                            message: "Something went wrong, Try again",
                            authentication: false,
                        });
                    }
                    return res.send({
                        code: 201,
                        message: data,
                        authentication: true,
                    });
                }));
            }));
        });
    }
    static test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            yield userRepository.testModelData(req, res);
        });
    }
}
exports.AuthenticationController = AuthenticationController;
