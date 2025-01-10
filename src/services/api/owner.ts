import { signupInterface } from "@/interface/user/registerInterface";
import { SignUpResponse } from "@/interface/user/registerResponseInterface";
import apiHandler from "@/utils/apiHandler";
import { AxiosResponse } from "axios";
import Api from "../config/axiosConfig";
import ownerEndpoints from "@/endpoints/ownerEndpoints";


export const signUp = async (
    ownerData: signupInterface
): Promise<AxiosResponse<SignUpResponse>> => {
    try {
        const response = await Api.post(ownerEndpoints.signUp, ownerData)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const verifyOtp = async (
    email: string,
    otp: string
): Promise<AxiosResponse<SignUpResponse> | undefined> => {
    try {
      const response = await Api.post(ownerEndpoints.verifyOtp, { email, otp })  
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
        const response = await Api.post(ownerEndpoints.resendOtp,{ email })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}