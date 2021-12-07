"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthenticationRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_controller_1 = require("../controllers/authentication.controller");
const userAuthenticationRouter = (0, express_1.default)();
exports.userAuthenticationRouter = userAuthenticationRouter;
userAuthenticationRouter.post("/signup", authentication_controller_1.AuthenticationController.createNewAccount);
userAuthenticationRouter.post("/loginwithusername", authentication_controller_1.AuthenticationController.loginwithusername);
userAuthenticationRouter.get("/test", authentication_controller_1.AuthenticationController.test);
