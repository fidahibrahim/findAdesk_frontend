import { signupInterface } from "@/interface/user/registerInterface";
import { SignUpResponse } from "@/interface/user/registerResponseInterface";
import apiHandler from "@/utils/apiHandler";
import { AxiosResponse } from "axios";
import Api from "../config/axiosConfig";
import ownerEndpoints from "@/endpoints/ownerEndpoints";
import { loginInterface } from "@/interface/user/loginInterface";
import { loginResponse } from "@/interface/user/loginResponse";


export interface WorkspaceResponse {
    success: boolean;
    message: string;
    data?: any;
}

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

export const resendOtp = async (
    email: string
): Promise<AxiosResponse<void> | undefined> => {
    try {
        const response = await Api.post(ownerEndpoints.resendOtp, { email })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const login = async (
    ownerCredentials: loginInterface
): Promise<AxiosResponse<loginResponse> | undefined> => {
    try {
        const response = await Api.post(ownerEndpoints.login, ownerCredentials)
        console.log(response);

        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const ownerSendForgotEmail = async (email: string) => {
    try {
        const response = await Api.post(ownerEndpoints.forgotPassword, { email })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const ownerLogout = async (): Promise<AxiosResponse<unknown> | undefined> => {
    try {
        const response = await Api.post(ownerEndpoints.logout)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const workspaceRegister = async (workspaceData: FormData): Promise<AxiosResponse<WorkspaceResponse>> => {
    try {
        workspaceData.forEach((data) => console.log(data))

        const response = await Api.post(ownerEndpoints.register, workspaceData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const listWorkspaces = async (search: string, page: number) => {
    try {
        return await Api.get(ownerEndpoints.listWorkspaces, {
            params: {
                search,
                page,
            },
        })
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const viewDetails = async (workspaceId: string) => {
    try {
        const response = await Api.get(`${ownerEndpoints.viewDetails}?workspaceId=${workspaceId}`)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const viewEditWorkspace = async (workspaceId: string) => {
    try {
        const response = await Api.get(`${ownerEndpoints.viewDetails}?workspaceId=${workspaceId}`)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const editWorkspace = async (workspaceId: string, formData: FormData) => {
    try {
        return await Api.put(`${ownerEndpoints.editWorkspace}?workspaceId=${workspaceId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const deleteWorkspace = async (workspaceId: string | undefined) => {
    try {
        const response = await Api.delete(`${ownerEndpoints.deleteWorkspace}?workspaceId=${workspaceId}`)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const listBookings = async (search: string, page: number) => {
    try {
        return await Api.get(ownerEndpoints.listBookings, {
            params: {
                search,
                page,
            },
        })
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const getBookingDetails = async (bookingId: string) => {
    try {
        const response = await Api.get(`${ownerEndpoints.getBookingDetails}?bookingId=${bookingId}`)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const getDashboardData = async () => {
    try {
        const response = await Api.get(ownerEndpoints.getDashboardData)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const getAllReviews = async () => {
    try {
        const response = await Api.get(ownerEndpoints.getAllReviews)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}