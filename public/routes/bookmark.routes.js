"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookmark_controller_1 = require("../controllers/bookmark.controller");
const bookmarkRouter = (0, express_1.default)();
exports.bookmarkRouter = bookmarkRouter;
bookmarkRouter.post("/addBookmark", bookmark_controller_1.BookmarkController.addToBookmarks);
