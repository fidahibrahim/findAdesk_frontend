import { signupInterface } from "@/interface/user/registerInterface";
import { SignUpResponse } from "@/interface/user/registerResponseInterface";
import axios, { AxiosResponse } from "axios";
import Api from "../config/axiosConfig";
import userEndpoints from "@/endpoints/userEndpoints";
import { loginInterface } from "@/interface/user/loginInterface";
import { loginResponse } from "@/interface/user/loginResponse";
import apiHandler from "@/utils/apiHandler";

export const signUp = async (
    userData: signupInterface
) : Promise <AxiosResponse<SignUpResponse>> => {
    try {
        const response = await Api.post(userEndpoints.signUp, userData)
        return response
    } catch (error) {
        if(axios.isAxiosError(error)){
            throw error
        }
        return Promise.reject()
    }
}

export const verifyOtp = async(
    email: string,
    otp: string
): Promise<AxiosResponse<SignUpResponse> | undefined> =>{
    try {
        const response = await Api.post(userEndpoints.verifyOtp, { email, otp })
        return response
    } catch (error) {
        console.log(error);
        return Promise.reject()
    }
}

export const resendOtp = async(
    email: string
): Promise<AxiosResponse <void> | undefined > => {
    try {
        const response = await Api.post(userEndpoints.resendOtp,{ email })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const login = async (
    userCredentials: loginInterface
) : Promise <AxiosResponse<loginResponse> | undefined> =>{
    try {
        const response = await Api.post(userEndpoints.login, userCredentials)
        return response
    } catch (error) {
        console.log(error)
        return Promise.reject()
    }
}

export const logout = async (): Promise<AxiosResponse <unknown>|undefined > => {
    try {
        const response = await Api.post(userEndpoints.logout)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}
