"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Middleware {
    static checkToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwt_secret_key = process.env.JWT_SECRET_KEY;
            let token = req.headers.authorization;
            let tokenValidity = false;
            jsonwebtoken_1.default.verify(token, jwt_secret_key, (error, data) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    tokenValidity = false;
                }
                else {
                    tokenValidity = true;
                    Middleware.tokenData = data;
                }
            }));
            return tokenValidity;
        });
    }
}
exports.Middleware = Middleware;
