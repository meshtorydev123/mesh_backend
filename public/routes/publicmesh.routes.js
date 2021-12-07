"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicmeshRouter = void 0;
const express_1 = __importDefault(require("express"));
const publicmesh_controller_1 = require("../controllers/publicmesh.controller");
const publicmeshRouter = (0, express_1.default)();
exports.publicmeshRouter = publicmeshRouter;
publicmeshRouter.post("/createpublicmesh", publicmesh_controller_1.PublicMeshController.createPublicMesh);
