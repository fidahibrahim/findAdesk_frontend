export interface checkoutBookingDetails {
    bookingId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    hours: number;
    additionalSeats: number;
    additionalSeatsAmount: number;
    serviceFee: number;
    day: string;
    seats: number;
    pricePerHour: number;
    total: number;
    subTotal: number;
    grandTotal: number;
    user: {
      name: string;
      email: string;
      mobile: string;
    };
    workspace: {
      workspaceId: string;
      workspaceName: string;
      spaceDescription: string;
      amenities: string[];
      images: string;
    };
  }