import Router from "express";
import { PublicMeshController } from "../controllers/publicmesh.controller";
const publicmeshRouter = Router();

publicmeshRouter.post("/createpublicmesh",PublicMeshController.createPublicMesh)


 

export {publicmeshRouter};