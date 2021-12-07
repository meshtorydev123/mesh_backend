"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userconnectionRouter = void 0;
const express_1 = __importDefault(require("express"));
const userconnection_controller_1 = require("../controllers/userconnection.controller");
const userconnectionRouter = (0, express_1.default)();
exports.userconnectionRouter = userconnectionRouter;
userconnectionRouter.post("/addconnection", userconnection_controller_1.UserConnectionController.addUserConnection);
