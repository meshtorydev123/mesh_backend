import Router from "express";
import { UserConnectionController } from "../controllers/userconnection.controller";
const userconnectionRouter = Router();

userconnectionRouter.post("/addconnection",UserConnectionController.addUserConnection);


 

export {userconnectionRouter};