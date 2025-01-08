import { signupInterface } from "./registerInterface";

export interface SignUpResponse {
    message: string;
    user: Omit<signupInterface, "password" | "confirmPassword"> & {
        verified: boolean;
        isAdmin?: boolean;
        createdAt: string
    }
    email: string
}