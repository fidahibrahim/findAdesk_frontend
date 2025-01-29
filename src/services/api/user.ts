import { signupInterface } from "@/interface/user/registerInterface";
import { SignUpResponse } from "@/interface/user/registerResponseInterface";
import  { AxiosResponse } from "axios";
import Api from "../config/axiosConfig";
import userEndpoints from "@/endpoints/userEndpoints";
import { loginInterface } from "@/interface/user/loginInterface";
import { loginResponse } from "@/interface/user/loginResponse";
import apiHandler from "@/utils/apiHandler";
import { TokenResponse } from "@react-oauth/google";

export const signUp = async (
    userData: signupInterface
) : Promise <AxiosResponse<SignUpResponse>> => {
    try {
        const response = await Api.post(userEndpoints.signUp, userData)
        return response
    } catch (error) {
        apiHandler(error)
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
        apiHandler(error)
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
        apiHandler(error)
        return Promise.reject()
    }
}

export const googleLogin = async (token: TokenResponse) => {
    try {
        const response = await Api.post(userEndpoints.googleLogin, token)
        return response
    } catch (error) {
        apiHandler(error)
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

export const sendForgotEmail = async (email: string) => {
    try {
        const response = await Api.post(userEndpoints.forgotPassword, {email})
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}



