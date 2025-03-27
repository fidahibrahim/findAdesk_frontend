interface User {
    name: string;
    email: string;
    mobile: string;
    _id: string;
}

interface Workspace {
    workspaceName: string;
    street: string;
    place: string;
    state: string;
    workspaceMail: string;
    _id: string;
}

export interface BookingDetails {
    _id: string;
    bookingId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    total: number;
    additionalSeatsAmount: number;
    serviceFee: number;
    grandTotal: number;
    paymentMethod?: string;
    hours: number;
    seats: string;
    pricePerHour: number;
    additionalSeats: number;
    userId: User;
    workspaceId: Workspace;
}