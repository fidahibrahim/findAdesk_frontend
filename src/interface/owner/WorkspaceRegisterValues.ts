
export interface FormValues {
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
    images: { file: File; preview: string }[];
    status: string
}

