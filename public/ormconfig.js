"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_entity_1 = require("./database/entity/user.entity");
const connectionOptions = {
    type: "postgres",
    host: process.env.POSTGRESQL_DB_HOST,
    port: 5432,
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    entities: [
        user_entity_1.UserEntity
    ],
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [(0, path_1.join)(__dirname, "src/migration/**/*.ts")],
};
module.exports = connectionOptions;
