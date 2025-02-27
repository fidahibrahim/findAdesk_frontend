
export interface SignUpResponse {
    message: string;
    data:  {
        _id: string;
        name: string;
        email: string;
        image: string;
        verified: boolean;

    }
}