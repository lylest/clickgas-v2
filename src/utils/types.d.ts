

export interface QueryOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    enabled?: boolean;
}

export interface IApiResponse {
    data: any
    error: null | any;
    message: string;
    statusCode: number;
}

export interface ICountry {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    countryCode: string;
    isoCode2: string;
    isoCode3: string;
    areaKm2: string;
}



export  interface ValidationError {
    codes: string[];
    arguments: {
        codes: string[];
        arguments: null | any[];
        defaultMessage: string;
        code: string;
    }[];
    defaultMessage: string;
    objectName: string;
    field: string;
    rejectedValue: string | null;
    bindingFailure: boolean;
    code: string;
}

export  interface ValidationErrorResponse {
    status: string;
    message: string;
    timestamp: string;
    path: string | null;
    errors: ValidationError[];
}
