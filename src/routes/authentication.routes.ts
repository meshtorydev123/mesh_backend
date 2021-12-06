import Router from "express";
import { AuthenticationController } from "../controllers/authentication.controller";
const userAuthenticationRouter = Router();

userAuthenticationRouter.post("/signup",AuthenticationController.createNewAccount);
userAuthenticationRouter.post("/loginwithusername",AuthenticationController.loginwithusername);
userAuthenticationRouter.get("/test",AuthenticationController.test);



 

export {userAuthenticationRouter};