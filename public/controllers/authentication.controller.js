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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../database/repository/user.repository");
dotenv_1.default.config();
class AuthenticationController {
    static showPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwt_secret_key = process.env.JWT_SECRET_KEY;
            let token = req.headers.authorization;
            jsonwebtoken_1.default.verify(token, "jwt_secret_key", (error, data) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return res.send({
                        data: error,
                        received: false,
                    });
                }
                return res.send({
                    posts: 'List of Posts',
                    userdata: data
                });
            }));
        });
    }
    static createNewAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, userpassword } = req.body;
            let jwt_secret_key = process.env.JWT_SECRET_KEY;
            let salt = yield bcrypt_1.default.genSalt(10);
            bcrypt_1.default.hash(userpassword, salt, (error, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return res.send({
                        message: error,
                        authentication: false,
                    });
                }
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                yield userRepository.saveUserData(req, res, hashedPassword);
                jsonwebtoken_1.default.sign({
                    username, //! Payload
                }, jwt_secret_key, //! Secret key
                {
                    expiresIn: "24h", //! Expiry time
                }, (error, data) => __awaiter(this, void 0, void 0, function* () {
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
    static loginwithusername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, userpassword } = req.body;
            let jwt_secret_key = process.env.JWT_SECRET_KEY;
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let userdata = yield userRepository.findUserPassword(req, res, username);
            if (userdata === undefined) {
                return res.send({
                    code: 404,
                    message: "Incorrect username",
                    authentication: false,
                });
            }
            bcrypt_1.default.compare(userpassword, userdata.userpassword, (error, result) => __awaiter(this, void 0, void 0, function* () {
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
                    username, //! Payload
                }, jwt_secret_key, //! Secret key
                {
                    expiresIn: "24h", //! Expiry time
                }, (error, data) => __awaiter(this, void 0, void 0, function* () {
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
    static updateuserprofilephoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                region: process.env.S3_BUCKET_REGION,
            });
            const upload = (0, multer_1.default)({
                storage: (0, multer_s3_1.default)({
                    s3,
                    bucket: process.env.S3_BUCKET_NAME,
                    metadata: function (req, file, cb) {
                        cb(null, { fieldName: file.fieldname });
                    },
                    key: function (req, file, cb) {
                        cb(null, `pjpeg`);
                    },
                }),
            }).single("img");
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
            });
            upload(req, res, function (err) {
                if (err instanceof multer_1.default.MulterError) {
                    // A Multer error occurred when uploading.
                    return res.send({
                        code: 401,
                        message: "Something went wrong, Try again",
                        authentication: false,
                    });
                }
                else if (err) {
                    // An unknown error occurred when uploading.
                    return res.send({
                        code: 401,
                        message: "Something went wrong, Try again",
                        authentication: false,
                    });
                }
                // Everything went fine.
                return res.send({
                    code: 201,
                    message: "Upload successfull",
                    authentication: true,
                });
            });
        });
    }
}
exports.AuthenticationController = AuthenticationController;
