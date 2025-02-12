export interface workspaceData {
    _id?: string;
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
}