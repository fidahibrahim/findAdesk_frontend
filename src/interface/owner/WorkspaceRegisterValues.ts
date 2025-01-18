
export interface FormValues {
    workspaceName: string;
    workspaceType: string;
    capacity: string;
    place: string;
    street: string;
    state: string;
    spaceDescription: string;
    startTime: string;
    endTime: string;
    workingDays: string;
    pricePerHour: string;
    workspaceRules: string;
    amenities: string[];
    images: { file: File; preview: string }[];
}