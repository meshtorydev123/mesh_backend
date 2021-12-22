import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { Request, Response } from "express";

@EntityRepository(UserEntity)

export class UserRepository extends Repository<UserEntity> {

    async saveUserData(req: Request, res: Response, hashedPassword: any) {

        let { user_username, user_phone, user_fullname } = req.body;

        this.createQueryBuilder("users").insert().values({
            user_phone,
            user_fullname,
            user_password: hashedPassword,
            user_username
        }).execute();




    }

    async in_GetUserUid(req: Request, res: Response): Promise<any> {
        let { user_username } = req.body;
        let getbaseuseruid = this.createQueryBuilder("users")
            .select("users.user_uid")
            .where("users.user_username = :user_username", { user_username })
            .getOne();
        return getbaseuseruid;
    }
    
    async findUserPassword(req: Request, res: Response, user_username: string): Promise<any> {
        let getbaseuserpassword = this.createQueryBuilder("users")
            .select("users.user_password")
            .where("users.user_username = :user_username", { user_username })
            .getOne();

        if (getbaseuserpassword === undefined) {
            return res.send({
                message: "User not found",
                authentication: false
            });
        }
        return getbaseuserpassword;
    }


    async updateprofilephoto(req: Request, res: Response, profilephotourl: string, user_uid: string) {


        this.createQueryBuilder("users").update()
            .set({ user_profilephoto: profilephotourl })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateusername(req: Request, res: Response, user_uid: string) {
        let { user_username } = req.body;



        this.createQueryBuilder("users").update()
            .set({ user_username: user_username })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateuserfullname(req: Request, res: Response, user_uid: string) {
        let { user_fullname } = req.body;


        this.createQueryBuilder("users").update()
            .set({ user_fullname: user_fullname })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateuseremail(req: Request, res: Response, user_uid: string) {
        let { user_email } = req.body;



        this.createQueryBuilder("users").update()
            .set({ user_email: user_email })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateuserphone(req: Request, res: Response, user_uid: string) {
        let { user_phone } = req.body;


        this.createQueryBuilder("users").update()
            .set({ user_phone: user_phone })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateuserwebsite(req: Request, res: Response, user_uid: string) {
        let { user_website } = req.body;


        this.createQueryBuilder("users").update()
            .set({ user_website: user_website })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateusergender(req: Request, res: Response, user_uid: string) {
        let { user_gender } = req.body;


        this.createQueryBuilder("users").update()
            .set({ user_gender: user_gender })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateuserdob(req: Request, res: Response, user_uid: string) {
        let { user_dob } = req.body;


        this.createQueryBuilder("users").update()
            .set({ user_dob: user_dob })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }
    async updateuserbio(req: Request, res: Response, user_uid: string) {
        let { user_bio } = req.body;


        this.createQueryBuilder("users").update()
            .set({ user_bio: user_bio })
            .where("user_uid = :user_uid", { user_uid: user_uid })
            .execute();

    }

    async myprofiledata(req: Request, res: Response, user_uid: string) {

        console.log(user_uid);




        try {
            let userprofiledata =await this.createQueryBuilder("users")
                .select()
                .where("users.user_uid = :user_uid", { user_uid })
                .getOne();

            if (userprofiledata !== undefined) {
                return res.send({
                    message: "User found",
                    data: userprofiledata,
                    code: 200
                });
            }
        } catch (error) {
            if (error !== undefined) {
                console.log(error);
                return res.send({
                    data: "",
                    code: 203,
                });
            }
        }




    }




}