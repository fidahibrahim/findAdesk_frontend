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

export const adminSendForgotEmail = async (email: string) => {
    console.log(email, "email")
    try {
        const response = await Api.post(adminEndpoints.forgotPassword, { email })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const adminLogout = async (): Promise<AxiosResponse<unknown> | undefined> => {
    try {
        const response = await Api.post(adminEndpoints.logout)
        return response
    } catch (error) {
        apiHandler(error)
    }
}

export const getUsers = async (search: string, page: number) => {

    try {
        return await Api.get(adminEndpoints.users, {
            params: {
                search,
                page,
            },
        })
    } catch (error) {
        apiHandler(error)
        throw error
    }
}

export const blockUser = async (userId: string) => {
    try {
        return await Api.patch(adminEndpoints.blockUser, {
            userId
        })
    } catch (error) {
        apiHandler(error)
    }
}

export const getOwners = async (search: string, page: number) => {
    try {
        return await Api.get(adminEndpoints.owners, {
            params: {
                search,
                page
            },
        })
    } catch (error) {
        apiHandler(error)
    }
}

export const blockOwner = async (ownerId: string) => {
    try {
        return await Api.patch(adminEndpoints.blockOwner, { ownerId })
    } catch (error) {
        apiHandler(error)
    }
}

export const getWorkspaces = async (search: string, page: number, filter: string | undefined) => {
    try {
        return await Api.get(adminEndpoints.workspaces, {
            params: {
                search,
                page,
                filter
            },
        })
    } catch (error) {
        apiHandler(error)
    }
}

export const getWorkspaceDetails = async (workspaceId: string) => {
    try {
        const response = await Api.get(`${adminEndpoints.viewDetails}?workspaceId=${workspaceId}`)
        return response
    } catch (error) {
        apiHandler(error)
    }
}

export const updateStatus = async (workspaceId: string | undefined, status: string) => {
    try {
        return await Api.put(adminEndpoints.updateStatus, { workspaceId, status })
    } catch (error) {
        apiHandler(error)
    }
}

export const fetchAdminRevenue = async (filter: any) => {
    try {
        const response = await Api.get(`${adminEndpoints.getAdminRevenue}?filter=${filter}`)
        return response
    } catch (error) {
        apiHandler(error)
    }
}
