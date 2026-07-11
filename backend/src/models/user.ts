import {Schema , model , Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password:string;
    role: "user" | "admin";
    createdAt : Date;
    updatedAt : Date;
    isVerified: boolean;
}


const userSchema = new Schema<IUser>(
    {
        name:{
          type: String,
          required:true,
          trim:true,
          minLength : 2 ,
          maxLength: 50
        },

        email:{
            type: String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true
        },
        
        password:{
            type:String,
            min:8,
            required:true,
            select: false
        },

        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user" 
        },
        
        isVerified:{
            type: Boolean,
            default: false,
        }
    }
);

const user =model<IUser>("user", userSchema);
 export default user