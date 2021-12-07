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
exports.PublicMeshRepository = void 0;
const typeorm_1 = require("typeorm");
const publicmesh_entity_1 = require("../entity/publicmesh.entity");
const user_repository_1 = require("./user.repository");
const publicmeshmember_repository_1 = require("./publicmeshmember.repository");
let PublicMeshRepository = class PublicMeshRepository extends typeorm_1.Repository {
    createPublicMesh(req, res, user_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { publicmesh_meshid, publicmesh_name, } = req.body;
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let user = yield userRepository.findOne({ user_uid });
            let publicMeshMemberRepository = new publicmeshmember_repository_1.PublicMeshMemberRepository();
            let publicMeshEntity = new publicmesh_entity_1.PublicMeshEntity();
            publicMeshEntity.publicmesh_meshid = publicmesh_meshid;
            publicMeshEntity.publicmesh_name = publicmesh_name;
            publicMeshEntity.publicmesh_createdby = user;
            yield publicMeshEntity
                .save()
                .then((data) => {
                if (data !== undefined) {
                    publicMeshMemberRepository.addAdminToPublicMesh(req, res, user_uid, data);
                    return res.send({
                        code: 201,
                        added: true,
                    });
                }
            })
                .catch((error) => {
                if (error !== undefined) {
                    console.log(error);
                    return res.send({
                        code: 401,
                        added: false,
                    });
                }
            });
        });
    }
};
PublicMeshRepository = __decorate([
    (0, typeorm_1.EntityRepository)(publicmesh_entity_1.PublicMeshEntity)
], PublicMeshRepository);
exports.PublicMeshRepository = PublicMeshRepository;
