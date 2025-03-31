export interface ISignupResponse {
    status: "100 CONTINUE";
    message: string;
    timestamp: string; // ISO 8601 date-time format
    path: string;
    data: {
        user: {
            createdAt: string;
            updatedAt: string;
            id: string;
            firstName: string;
            middleName: string;
            lastName: string;
            gender: string;
            dob: string; // ISO 8601 date format (yyyy-MM-dd)
            username: string;
            cloudId: string;
            phone: string;
            recoveryEmail: string;
            country: string;
            region: string;
            address: string;
            verified: boolean;
            phoneVerifiedAt: string;
            emailVerifiedAt: string;
            active: boolean;
            disabledAt: string;
            enabled: boolean;
            authorities: {
                authority: string;
            }[];
            accountNonExpired: boolean;
            accountNonLocked: boolean;
            credentialsNonExpired: boolean;
        };
        tokens: {
            access: {
                value: string;
                minutes: number;
                expiration: string;
            };
            refresh: {
                value: string;
                minutes: number;
                expiration: string;
            };
        };
    };
}

export interface ISignupForm {
    firstName: string;
    middleName?: string; // Optional, as it's an empty string in the example
    lastName: string;
    dob: string | Date; // Assuming date of birth is in string format (YYYY-MM-DD)
    gender: string;
    username: string;
    phone: string;
    recoveryEmail: string;
    region: string;
    address: string;
    password: string;
    countryISOCode: string;
}

export interface ILoginForm {
    userId: string,
    password: string
}

export interface ILoginResponse  extends  ISignupResponse {

}

export interface UserProfileResponse {
    status: string;
    code: number;
    message: string;
    timestamp: string;
    reqId: string | null;
    path: string | null;
    data: UserProfileData;
}

interface UserProfileData {
    createdAt: string;
    updatedAt: string;
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    gender: "M" | "F";
    dob: string;
    username: string;
    cloudId: string;
    phone: string;
    recoveryEmail: string;
    country: string;
    region: string;
    address: string;
    verified: boolean;
    phoneVerifiedAt: string;
    emailVerifiedAt: string | null;
    active: boolean;
    disabledAt: string | null;
    enabled: boolean;
    authorities: string[] | null;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}



export interface IUser {
    id: string;
    userName: string;
    email: string;
    phone: string;
    region: string;
    country: string;
    notificationToken: string;
    password: string;
    userStatus: string;
    createdAt: string;
    updatedAt: string;
}