export interface IFileDetails {
    id: string;
    name: string;
    size: number;
    type: string;
    ext: string;
    bucketUrl: string;
    createdBy: string;
}

export interface IFileResponse {
    data: IFileDetails;
    message: string;
}