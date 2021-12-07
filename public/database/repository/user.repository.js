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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entity/user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    saveUserData(req, res, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_username, user_phone, user_fullname } = req.body;
            this.createQueryBuilder("users").insert().values({
                user_phone,
                user_fullname,
                user_password: hashedPassword,
                user_username
            }).execute();
        });
    }
    in_GetUserUid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_username } = req.body;
            let getbaseuseruid = this.createQueryBuilder("users")
                .select("users.user_uid")
                .where("users.user_username = :user_username", { user_username })
                .getOne();
            return getbaseuseruid;
        });
    }
    findUserPassword(req, res, user_username) {
        return __awaiter(this, void 0, void 0, function* () {
            let getbaseuserpassword = this.createQueryBuilder("users")
                .select("users.user_password")
                .where("users.user_username = :user_username", { user_username })
                .getOne();
            if (getbaseuserpassword === undefined) {
                return res.send({
                    message: "User not found",
                    authentication: false
                });
            }
            return getbaseuserpassword;
        });
    }
    updateprofilephoto(req, res, profilephotourl, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createQueryBuilder("users").update()
                .set({ user_profilephoto: profilephotourl })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateusername(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_username } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_username: user_username })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateuserfullname(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_fullname } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_fullname: user_fullname })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateuseremail(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_email } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_email: user_email })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateuserphone(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_phone } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_phone: user_phone })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateuserwebsite(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_website } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_website: user_website })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateusergender(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_gender } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_gender: user_gender })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateuserdob(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_dob } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_dob: user_dob })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    updateuserbio(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_bio } = req.body;
            this.createQueryBuilder("users").update()
                .set({ user_bio: user_bio })
                .where("user_uid = :user_uid", { user_uid: user_uid })
                .execute();
        });
    }
    testModelData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let post = yield this.createQueryBuilder("posts")
                    .leftJoinAndSelect("posts.post_user", "users")
                    .select()
                    .getMany();
                if (post !== undefined) {
                    return res.send({
                        code: 200,
                        data: post,
                        received: true,
                    });
                }
            }
            catch (error) {
                if (error !== undefined) {
                    return res.send({
                        code: 401,
                        data: error,
                        received: false,
                    });
                }
            }
        });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.UserEntity)
], UserRepository);
exports.UserRepository = UserRepository;
