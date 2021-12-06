import { join } from "path";
import dotenv from "dotenv";
dotenv.config();
import { ConnectionOptions } from "typeorm"; 
import { UserEntity } from "./database/entity/user.entity";
import { PostEntity } from "./database/entity/post.entity";
import { LikeEntity } from "./database/entity/like.entity";
import { BookmarkEntity } from "./database/entity/bookmark.entity";
import { CommentEntity } from "./database/entity/comment.entity";
import { UserConnectionEntity } from "./database/entity/userconnection.entity";
import { DirectChatConversationEntity } from "./database/entity/directchatconversation.entity";
import { DirectChatMessageEntity } from "./database/entity/directchatmessage.entity";
import { DirectChatParticipantEntity } from "./database/entity/directchatparticipant.entity";
import { PublicMeshEntity } from "./database/entity/publicmesh.entity";
import { PublicMeshMemberEntity } from "./database/entity/publicmeshmember.entity";
import { PrivateMeshEntity } from "./database/entity/privatemesh.entity";
import { PrivateMeshMemberEntity } from "./database/entity/privatemeshmember.entity";


const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRESQL_DB_HOST as string,
  port: 5432,
  username: process.env.POSTGRESQL_DB_USER as string,
  password: process.env.POSTGRESQL_DB_PASSWORD as string,
  database: process.env.POSTGRESQL_DB as string,
  entities: [
    UserEntity,
    PostEntity,
    LikeEntity,
    BookmarkEntity,
    CommentEntity,
    UserConnectionEntity,
    DirectChatConversationEntity,
    DirectChatParticipantEntity,
    DirectChatMessageEntity,
    PublicMeshEntity,
    PublicMeshMemberEntity,
    PrivateMeshEntity,
    PrivateMeshMemberEntity

  ],
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  logging: false,
  logger: "debug",
  migrations: [join(__dirname, "src/migration/**/*.ts")],
};

export = connectionOptions;
