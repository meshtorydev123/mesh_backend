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
exports.UserSettingsController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../database/repository/user.repository");
const middleware_1 = require("../middleware");
dotenv_1.default.config();
class UserSettingsController {
    // UPDATE USERDATA
    static updateuserprofilephoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
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
                            cb(null, `userprofilephoto-${middleware_1.Middleware.tokenData.user_uid}.jpeg`);
                        },
                    }),
                }).single("img");
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
                    let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                    userRepository.updateprofilephoto(req, res, req.file.location, middleware_1.Middleware.tokenData.user_uid);
                    return res.send({
                        code: 201,
                        message: "Upload successfull",
                        authentication: true,
                    });
                });
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
    static updateusername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateusername(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
    static updateuseremail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateuseremail(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
    static updateuserphone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateuserphone(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
    static updateuserwebsite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateuserwebsite(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
    static updateusergender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateusergender(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
    static updateuserdob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateuserdob(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
    static updateuserfullname(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateuserfullname(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
    static updateuserbio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyToken = yield middleware_1.Middleware.checkToken(req, res);
            if (verifyToken === true) {
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                userRepository.updateuserbio(req, res, middleware_1.Middleware.tokenData.user_uid);
                return res.send({
                    code: 201,
                    message: "Update successfull",
                    authentication: true,
                });
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
exports.UserSettingsController = UserSettingsController;
