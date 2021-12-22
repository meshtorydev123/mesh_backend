import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";

import { getCustomRepository } from "typeorm";
import { UserRepository } from "../database/repository/user.repository";
import { Middleware } from "../middleware";
dotenv.config();




export class AuthenticationController{


   
    static async createNewAccount(req:Request,res:Response){
      let {user_password}=req.body;

        let salt = await bcrypt.genSalt(10);
        bcrypt.hash(user_password,salt,async (error:any,hashedPassword:any)=>{
          if(error){
            return res.send({
              message:error,
              authentication:false,
            });

          }
          let userRepository=getCustomRepository(UserRepository);
          await userRepository.saveUserData(req,res,hashedPassword);
          return res.send({
            code: 201,
            message: "Account created",
            authentication: true,
          });
        }
        )
    }


    static async loginwithusername(req:Request,res:Response){
      let {user_username,user_password}=req.body;
      let jwt_secret_key = process.env.JWT_SECRET_KEY as string;

      let userRepository=getCustomRepository(UserRepository);
      let userdata = await userRepository.findUserPassword(req,res,user_username);
      let uid = await userRepository.in_GetUserUid(req,res);

      if (userdata === undefined) {
        return res.send({
          code: 404,
          message: "Incorrect username",
          authentication: false,
        });
      }
      bcrypt.compare(user_password,userdata!.user_password,async (error:any,result:any)=>{
        if(error){
          return res.send({
            code: 404,
            message:error,
            authentication:false
          });
        }

        if(!result){
          return res.send({
            code: 404,
            message:"Incorrect Password",
            authentication:false
          });
        }

        jwt.sign(
          {
            user_uid:uid!.user_uid, //! Payload
          },
          jwt_secret_key, //! Secret key
          
          async (error: any, data: any) => {
            //! Callback
            if (error) {
              return res.send({
                code: 401,
                message: "Something went wrong, Try again",
                authentication: false,
              });
            }
            return res.send({
              code: 201,
              message: data,
              authentication: true,
            });
          }
        );



      })


    }

    static async myprofiledata(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.myprofiledata(req,res,Middleware.tokenData.user_uid);
          
          
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
      
      }
    } 





    

}

