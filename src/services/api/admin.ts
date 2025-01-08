import apiHandler from "@/utils/apiHandler"
import Api from "../config/axiosConfig"
import adminEndpoints from "@/endpoints/adminEndpoints"
import { loginInterface } from "@/interface/user/loginInterface"
import { AxiosResponse } from "axios"
import { adminLoginResponse } from "@/interface/user/loginResponse"




export const adminLogin = async (
    adminCredentials: loginInterface
): Promise<AxiosResponse<adminLoginResponse>> => {
    try {
        const response = await Api.post(adminEndpoints.login, adminCredentials)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const adminLogout = async (): Promise<AxiosResponse<unknown>|undefined> => {
    try {
        const response = await Api.post(adminEndpoints.logout)
        return response
    } catch (error) {
        apiHandler(error)
    }
}

export const getUsers = async () => {
    try {
        return await Api.get(adminEndpoints.users)
    } catch (error) {
        apiHandler(error)
    }
}

