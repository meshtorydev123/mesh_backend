import Router from "express";
import { UserSettingsController } from "../controllers/usersettings.controller";
const userSettingsRouter = Router();


// UPDATE USERDATA
userSettingsRouter.patch("/updateuserprofilephoto",UserSettingsController.updateuserprofilephoto);
userSettingsRouter.patch("/updateusername",UserSettingsController.updateusername);
userSettingsRouter.patch("/updateusergender",UserSettingsController.updateusergender);
userSettingsRouter.patch("/updateuserphone",UserSettingsController.updateuserphone);
userSettingsRouter.patch("/updateuseremail",UserSettingsController.updateuseremail);
userSettingsRouter.patch("/updateuserdob",UserSettingsController.updateuserdob);
userSettingsRouter.patch("/updateuserbio",UserSettingsController.updateuserbio);
userSettingsRouter.patch("/updateuserwebsite",UserSettingsController.updateuserwebsite);
userSettingsRouter.patch("/updateuserfullname",UserSettingsController.updateuserfullname);
// UPDATE USERDATA

 

export {userSettingsRouter};