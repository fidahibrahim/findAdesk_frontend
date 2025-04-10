export interface BookingInt {
    _id: string;
    bookingId: string;
    workspaceId: {
        _id: string;
        workspaceName: string;
        workspaceMail: string
    };
    date: string;
    grandTotal: number;
    serviceFee: number;
    status: string;
}