"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSettingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const usersettings_controller_1 = require("../controllers/usersettings.controller");
const userSettingsRouter = (0, express_1.default)();
exports.userSettingsRouter = userSettingsRouter;
// UPDATE USERDATA
userSettingsRouter.patch("/updateuserprofilephoto", usersettings_controller_1.UserSettingsController.updateuserprofilephoto);
userSettingsRouter.patch("/updateusername", usersettings_controller_1.UserSettingsController.updateusername);
userSettingsRouter.patch("/updateusergender", usersettings_controller_1.UserSettingsController.updateusergender);
userSettingsRouter.patch("/updateuserphone", usersettings_controller_1.UserSettingsController.updateuserphone);
userSettingsRouter.patch("/updateuseremail", usersettings_controller_1.UserSettingsController.updateuseremail);
userSettingsRouter.patch("/updateuserdob", usersettings_controller_1.UserSettingsController.updateuserdob);
userSettingsRouter.patch("/updateuserbio", usersettings_controller_1.UserSettingsController.updateuserbio);
userSettingsRouter.patch("/updateuserwebsite", usersettings_controller_1.UserSettingsController.updateuserwebsite);
userSettingsRouter.patch("/updateuserfullname", usersettings_controller_1.UserSettingsController.updateuserfullname);
