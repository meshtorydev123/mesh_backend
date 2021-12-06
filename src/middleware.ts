import dotenv from "dotenv";
dotenv.config({ path: './.env'});
import {Request, Response} from "express";
import jwt from "jsonwebtoken";

export class Middleware{

    static tokenData: any;
    

    static async checkToken(req:Request,res:Response){
        
        let jwt_secret_key = process.env.JWT_SECRET_KEY as string;
        let token = req.headers.authorization as string;
        let tokenValidity = false;
        jwt.verify(token,jwt_secret_key,async(error:any,data:any)=>{
            if(error){
                tokenValidity= false;
            }
            else{
                tokenValidity=  true;
                Middleware.tokenData = data;
            }
            
            
    
    
        });
        return tokenValidity;
    
  
      }

}



