import type { promises } from "dns";

const BASE_URL = import.meta.env.VITE_API_URL;



type LoginResponse = {
    success:boolean;
    message: string;
    user:{
        _id: string;
        name:string;
        email:string;
        role:string;
    };
};

export async function loginUser(email: string, password:string): Promise<LoginResponse> 
{
    const Response = await fetch(`${BASE_URL}/login`, {
        method: "POST",

        credentials: "include",
        headers:{
            "Content-Type" : "application/json",
        },

body: JSON.stringify({
    email,
    password,
                     }),
    });

const data = await Response.json();

if(!Response.ok){
    throw new Error(data.message);
}


return data;
}


type SignUpResponse = {
    success:boolean;
    message: string;
    user:{
        _id: string;
        name:string;
        email:string;
        role:string;
    };
};






export async function signUpUser(name:string , email: string, password:string): Promise<SignUpResponse> 
{
    const Response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",

        credentials: "include",
        headers:{
            "Content-Type" : "application/json",
        },

body: JSON.stringify({
    name,
    email,
    password,
                     }),
    });

const data = await Response.json();

if(!Response.ok){
    throw new Error(data.message);
}


return data;
}



type LogOutResponse = {
    success:boolean;
    message: string;
   
};


export async function logOutUser() : Promise<LogOutResponse> {

    const response = await fetch(`${BASE_URL}/logout` , {

    method: "POST",
    credentials:"include"

    });


    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data;
    
}









    
