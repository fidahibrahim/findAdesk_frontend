export interface loginResponse {
    status: boolean;
    message: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
}
export interface adminLoginResponse {
    status: boolean;
    message: string;
    admin: {
        _id: string;    
        name: string;
        email: string;
    };
}


