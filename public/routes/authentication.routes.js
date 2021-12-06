"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authrouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_controller_1 = require("../controllers/authentication.controller");
const authrouter = (0, express_1.default)();
exports.authrouter = authrouter;
authrouter.get("/posts", authentication_controller_1.AuthenticationController.showPosts);
authrouter.post("/signup", authentication_controller_1.AuthenticationController.createNewAccount);
authrouter.post("/login", authentication_controller_1.AuthenticationController.loginwithusername);
authrouter.patch("/updateprofilephoto", authentication_controller_1.AuthenticationController.updateuserprofilephoto);
