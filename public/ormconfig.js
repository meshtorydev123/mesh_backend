"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_entity_1 = require("./database/entity/user.entity");
const post_entity_1 = require("./database/entity/post.entity");
const like_entity_1 = require("./database/entity/like.entity");
const bookmark_entity_1 = require("./database/entity/bookmark.entity");
const comment_entity_1 = require("./database/entity/comment.entity");
const userconnection_entity_1 = require("./database/entity/userconnection.entity");
const directchatconversation_entity_1 = require("./database/entity/directchatconversation.entity");
const directchatmessage_entity_1 = require("./database/entity/directchatmessage.entity");
const directchatparticipant_entity_1 = require("./database/entity/directchatparticipant.entity");
const publicmesh_entity_1 = require("./database/entity/publicmesh.entity");
const publicmeshmember_entity_1 = require("./database/entity/publicmeshmember.entity");
const privatemesh_entity_1 = require("./database/entity/privatemesh.entity");
const privatemeshmember_entity_1 = require("./database/entity/privatemeshmember.entity");
const connectionOptions = {
    type: "postgres",
    host: process.env.POSTGRESQL_DB_HOST,
    port: 5432,
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    entities: [
        user_entity_1.UserEntity,
        post_entity_1.PostEntity,
        like_entity_1.LikeEntity,
        bookmark_entity_1.BookmarkEntity,
        comment_entity_1.CommentEntity,
        userconnection_entity_1.UserConnectionEntity,
        directchatconversation_entity_1.DirectChatConversationEntity,
        directchatparticipant_entity_1.DirectChatParticipantEntity,
        directchatmessage_entity_1.DirectChatMessageEntity,
        publicmesh_entity_1.PublicMeshEntity,
        publicmeshmember_entity_1.PublicMeshMemberEntity,
        privatemesh_entity_1.PrivateMeshEntity,
        privatemeshmember_entity_1.PrivateMeshMemberEntity
    ],
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [(0, path_1.join)(__dirname, "src/migration/**/*.ts")],
};
module.exports = connectionOptions;
