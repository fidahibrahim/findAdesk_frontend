export interface Address {
    place: string;
    state: string;
    pincode: number;
}

export interface profileInterface {
    userId?: string;
    name: string;
    email: string;
    image: any;
    imageFile?: File;
    isSubscribed?: boolean
}


