import { signupInterface } from "@/interface/user/registerInterface";
import { SignUpResponse } from "@/interface/user/registerResponseInterface";
import { AxiosResponse } from "axios";
import Api from "../config/axiosConfig";
import userEndpoints from "@/endpoints/userEndpoints";
import { loginInterface } from "@/interface/user/loginInterface";
import { loginResponse } from "@/interface/user/loginResponse";
import apiHandler from "@/utils/apiHandler";
import { TokenResponse } from "@react-oauth/google";
import { ContactData } from "@/interface/user/contactInterface";
import { resetPass } from "@/interface/user/resetPassword";
import { bookingDetails } from "@/interface/user/workspaceInterface";

export const signUp = async (
    userData: signupInterface
): Promise<AxiosResponse<SignUpResponse>> => {
    try {
        const response = await Api.post(userEndpoints.signUp, userData)
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
        const response = await Api.post(userEndpoints.verifyOtp, { email, otp })
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
        const response = await Api.post(userEndpoints.resendOtp, { email })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const login = async (
    userCredentials: loginInterface
): Promise<AxiosResponse<loginResponse> | undefined> => {
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

export const logout = async (): Promise<AxiosResponse<unknown> | undefined> => {
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
        const response = await Api.post(userEndpoints.forgotPassword, { email })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const changePassword = async (token: string | undefined, password: string) => {
    try {
        const response = await Api.post(userEndpoints.changePassword, { token, password })
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const contactService = async (values: ContactData) => {
    try {
        const response = await Api.post(userEndpoints.contactUs, values)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const getProfile = async () => {
    try {
        const response = await Api.get(userEndpoints.getProfile)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const fetchRecentWorkspaces = async () => {
    try {
        const response = await Api.get(userEndpoints.recentWorkspaces)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const fetchFilterWorkspaces = async (filters: any) => {
    try {
        const response = await Api.post(userEndpoints.filterWorkspaces, filters);
        return response;
    } catch (error) {
        apiHandler(error);
        return Promise.reject(error);
    }
}

export const workspaceDetails = async (workspaceId: string) => {
    try {
        const response = await Api.get(`${userEndpoints.workspaceDetails}?workspaceId=${workspaceId}`)
        return response
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const editProfile = async (formData: FormData) => {
    try {
        return await Api.put(userEndpoints.editProfile, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const resetPassword = async (data: resetPass) => {
    try {
        return await Api.post(userEndpoints.resetPassword, data)
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const checkAvailability = async (workspaceId: string, data: any) => {
    try {
        return await Api.post(`${userEndpoints.checkAvailability}?workspaceId=${workspaceId}`, data)
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const pendingBookings = async (
    workspaceId: string,
    bookingDetails: bookingDetails | undefined,
    pricePerHour: string
  ) => {
    try {
      return await Api.post(userEndpoints.pendingBooking, {
        workspaceId,
        bookingDetails,
        pricePerHour,
      });
    } catch (error) {
      apiHandler(error);
      return Promise.reject();
    }
  };

export const bookings = async (payload: any) => {
    try {
        return await Api.post(userEndpoints.bookings, {payload})
    } catch (error) {
        apiHandler(error)
        return Promise.reject()
    }
}

export const getBookingDetails = async (bookingId: string) => {
    try {
        const response = await Api.get(`${userEndpoints.getBookingDetails}?bookingId=${bookingId}`)
        return response
    } catch (error) {
        throw error
    }
}
