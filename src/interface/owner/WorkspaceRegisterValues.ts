
export interface FormValues {
    _id?: string;
    ownerId?: string;
    workspaceName: string;
    workspaceMail: string;
    workspaceType: string;
    capacity: string;
    bookedSeats?: string
    place: string;
    street: string;
    state: string;
    spaceDescription: string;
    startTime: Date | null;
    endTime: Date | null;
    workingDays: string;
    pricePerHour: string;
    workspaceRules: string;
    amenities: string[];
    images: { file: File; preview: string }[];
    status: string
}
export interface workspaceRes {
    _id?: string;
    ownerId?: string;
    workspaceName: string;
    workspaceMail: string;
    workspaceType: string;
    capacity: string;
    place: string;
    street: string;
    state: string;
    spaceDescription: string;
    startTime: Date | null;
    endTime: Date | null;
    workingDays: string;
    pricePerHour: string;
    workspaceRules: string[];
    amenities: string[];
    images: string[];
    status: string
}
export interface bookingRes {
    _id?: string;
    userId: string;
    workspaceId: string;
    bookingId: string;
    date: string | Date;
    startTime: string | Date;
    endTime: string | Date;
    duration?: string;
    seats: string;
    concern?: string;
    total: number;
    grandTotal: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentMethod?: string;
    additionalSeats?: number;
    additionalSeatsAmount?: number;
    serviceFee?: number;
    day?: string;
    pricePerHour?: number;
}

