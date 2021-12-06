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




export class UserSettingsController{


   
   

    // UPDATE USERDATA
    static async updateuserprofilephoto(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){
        


        const s3 = new aws.S3({
          accessKeyId : process.env.S3_ACCESS_KEY as string,
          secretAccessKey : process.env.S3_SECRET_ACCESS_KEY as string,
          region : process.env.S3_BUCKET_REGION as string,
        });
        const upload = multer ({
         storage: multerS3({
             s3,
             bucket:process.env.S3_BUCKET_NAME as string,
             metadata: function (req, file, cb ){
                 cb(null,{fieldName:file.fieldname});

        
             },
             key : function (req, file, cb ){
                 cb(null,`userprofilephoto-${Middleware.tokenData.user_uid}.jpeg`); 
                 
                 
        
             },
         }),
        
        }).single("img") ;
  
        
        
  
        upload(req, res, function (err)  {
          if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.send({
              code: 401,
              message: "Something went wrong, Try again",
              authentication: false,
            });
          } else if (err) {
            // An unknown error occurred when uploading.
            return res.send({
              code: 401,
              message: "Something went wrong, Try again",
              authentication: false,
            });
  
          }
          
      
          // Everything went fine.
          
          let userRepository=getCustomRepository(UserRepository);
          userRepository.updateprofilephoto(req,res,(req as any).file.location,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Upload successfull",
            authentication: true,
          });
  
        })

      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    }    
    static async updateusername(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateusername(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    }  
    static async updateuseremail(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateuseremail(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    } 
    static async updateuserphone(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateuserphone(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    } 
    static async updateuserwebsite(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateuserwebsite(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    } 
    static async updateusergender(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateusergender(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    } 
    static async updateuserdob(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateuserdob(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    } 
    static async updateuserfullname(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateuserfullname(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    } 
    static async updateuserbio(req:Request,res:Response){


      let verifyToken = await Middleware.checkToken(req,res);
      if(verifyToken === true ){

        let userRepository=getCustomRepository(UserRepository);
          userRepository.updateuserbio(req,res,Middleware.tokenData.user_uid);
          
          return res.send({
            code: 201,
            message: "Update successfull",
            authentication: true,
          });
     
      }
      else{

        return res.send({
          code: 401,
          message: "User not verified. Login Again",
          authentication: false,
        });
        


      }






     
     

    } 
    
    // UPDATE USERDATA
}

