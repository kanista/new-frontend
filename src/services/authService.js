import {API_ENDPOINTS} from "../const/API_ENDPOINTS";
import axios from "axios";

const login=async (loginDto)=>{
    try{
        const response= await axios.post(API_ENDPOINTS.LOGIN,{
            email: loginDto.email,
            password: loginDto.password
        });
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        return error.response;
    }
}

const register=async (registerDto)=>{
    try{
        const response=await axios.post(API_ENDPOINTS.REGISTER,{
            email: registerDto.email,
            password: registerDto.password,
            confirmPassword: registerDto.confirmPassword,
            username: registerDto.name,
            role: "USER"
        });
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        return error.response;
    }
}

export default{login,register};